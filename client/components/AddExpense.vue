<template>
	<div class="parent-body">
		<heading></heading>

		<nav>
			<ul>
				<li>
					<router-link :to="{name: 'AllExpense'}" class="link">All Expense</router-link>
				</li>
			</ul>
			
		</nav>

		<div class="cal-vat" v-show="euroSign">	
				<calculate-vat v-bind:gross-amount='euroAmount' v-bind:symbol="euroSign"></calculate-vat>
		</div>

		<section class="form-handler">
			<form action="" method='post' @submit="submitQuery">
				<div class="form-control">
					<label for="value">Value Of Expense (EUR)</label>
					<div>
						<input v-model="inputValue" class="input-control" type="text" id="value" name="value" placeholder="Expense (e.g) 200 EUR" required>
					</div>
					<span class="error" v-show="errorMsg">{{errorMsg}}</span>
				</div>

				<div class="form-control">
					<label for="reason">Reason For Expense</label>
					<div>
						<textarea v-model="reasonForExpense" class="input-control" name="reason" id="reason" placeholder="Reason for Expenditure" cols="30" rows="10" required></textarea>
					</div>
				</div>
				<div class="deliver">
					<input class="send-form" type="submit" value="Submit">
				</div>
				
			</form>
		</section>

	</div>
</template>


<script>
	import _ from 'lodash'
	import axios from "axios"
	import Heading from "./Heading.vue"
	import CalculateVAT from "./CalculateVAT.vue"

	export default {
		name: 'Expense',
		data: ()=>({
			inputValue: "",
			reasonForExpense: "",
			errorMsg: "",
			euroAmount: "",
			euroSign: "",
			pounds: 'GBP',
			exchangeAmount: "",
		}),
		components :{
			Heading,
			'calculate-vat':CalculateVAT
		},
		methods:{
			Answer: _.debounce(function(){
				/**
				 * [euroAmount Amount inputed by the user]
				 * @type {[type Integer]}
				 *
				 * [euroSign Currency symbol inputed by the user]
				 * @type { [type string]}
				 */
				this.euroAmount = this.inputValue.split(" ")[0]
				this.euroSign = this.inputValue.split(" ")[1].toUpperCase()

				const xchangeUrl = `https://free.currencyconverterapi.com/api/v5/convert?q=${this.euroSign}_${this.pounds}`;
				//converting from Euro to Pounds
				if(this.euroSign !== 'EUR'){
					this.errorMsg = 'Currency symbol must be in Eur'
				}else{
					axios.get(xchangeUrl)
					.then(response =>{

						const fetchData= Object.values(response.data.results)
						
						fetchData.map(data =>{
							console.log(data)

							// resulting amount after converting from Euro to Pounds
							const result = (parseFloat(this.euroAmount) * data.val).toFixed(2)
							
							//amount from Euro to Pounds
							this.exchangeAmount = `${result} ${data.to}`

						})
					}).catch(error =>{
						this.errorMsg = `${error.message} ${'please refresh'}`
					})	
				}
				
			}, 500),

			//submit form entry
			submitQuery(){
				axios.post('/expense',{
					inputValue: this.exchangeAmount,
					reasonForExpense: this.reasonForExpense
				}).then(response =>{
					console.log('data saved')
				})
				this.$swal('DATA SAVED')
				this.$router.push({name: 'AllExpense'})
			}
		},
		watch:{
			inputValue(){
				let validInput = this.inputValue.split(' ')

				//check for the length of user input
				if(validInput.length === 2){
					//User input correct, disable error message
					this.errorMsg = ""

					//make a request to the server
					this.Answer()
				}else{
					//user input is invalid, display error message
					this.errorMsg = "Input Format: E.G 200 EUR "
				}
			}
		}

	}
	
</script>


<style scoped>

	.parent-body {
		text-align: center;
		width: 100%;
	}
	.cal-vat {
		border-radius: 10px;
		font-size: 20px;
		font-family: cursive;
		width: 250px;
		margin: auto;
		padding: 2px;
		color: #fff;
		background-color: #32CD32;

	}
	.error{
		font-size: 18px;
		padding: 3px;
		color: #fff;
		background-color: #FF6347;
	}
	.form-handler {
		margin: auto;		
	}
	label {
		font: 20px serif;
	}
	.form-control {
		margin: 20px;
	}
	.input-control {
		padding: 15px;
		font: bold 18px sans-serif;
		width: 80%;
		text-align: center;
		border-radius: 5px;
		border: 0.5px solid grey;
	}
	.send-form {
		background-color: #42b983;
		color: #fff;
		font-size: 20px;
		font-family: sans-serif;
		text-transform: uppercase;
		width: 100px;
		height: 50px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
	li,.link{
		text-decoration: none;
		list-style: none;
		font-size: 25px;
		font-weight: bold;
		color: #42b983;
	}
	nav{
		text-align: left
	}
</style>