<template>
	<div> 
		<nav>
			<ul>
				<li>
					<router-link :to="{name: 'Expense'}" class="link">Add Expense</router-link> 
				</li>
			</ul>
		</nav>
		
	
		<table class="display-data">
			<caption>List Of Expenses </caption>
			<tr class="ouput">
				<th>Date</th>
				<th>Expense Amount</th>
				<th>Reason</th>
			</tr>
			<tr v-for="item in data" class="output">
				<td>{{item.date | moment }}</td>
				<td>{{item.value}}</td>
				<td>{{item.reason}}</td>

				
				<td><button @click="deleteX(item.id)"> DELETE</button></td>
			</tr>


		</table>
	</div>
</template>

<script>
	import axios from "axios"
	import moment from 'moment'

	export default {
		name: 'AllExpense',
		data: ()=>({
			data: []
			
		}),
		methods:{
			fetchExpense(){
				axios.get("/expense")
				.then(response => this.data = response.data )
			},
			deleteX(itemId){
				if(confirm('Are You Sure To Proceed ?')){
					axios.delete('/expense/' + itemId)
					.then(result =>{
						this.$swal('Item Deleted')
						this.$router.go()
					})
				}else{
					return false
				}
				
			}
		},
		created(){
			this.fetchExpense()
		},
		filters:{
			moment(value){
				return moment(String(value)).format('DD/MM/YYYY')
			}
		}
	}
</script>


<style scoped>
	caption {
		background-color: green;
		color: #fff;
		font-size: 20px;
		height: 30px;
		padding: 5px;
		margin-bottom: 10px;
		border-radius: 3px;
	}
	.display-data{
		width: 80%;
		margin: auto;
	}
	td,th{
		border: 2px solid #111;
		padding: 10px;
	}
	nav{
		margin: 20px auto 20px
	}
	li{
		background-color: #eee;
		padding: 5px;
		font-weight: bold;
		text-align: center;
		list-style: none;
		width: 50%;
		margin: auto;
	}
	.link{
		text-decoration: none;
		font-size: 20px;
		font-weight: bold;
		background-color: #eee;
		padding: 5px;
		color: #111;

	}
	button{
		border: none;
		padding: 5px;
		font-size: 20px;
		font-weight: bold;
		cursor: pointer;
	}
</style>