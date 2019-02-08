<template>
	<div class="parent-body">
		<heading></heading>

		<section class="form-handler">
			<form action="" method='post'>
				<div class="form-control">
					<label for="value">Value Of Expense</label>
					<div>
						<input class="input-control" type="text" id="value" name="value" placeholder="Expense (e.g) 200 EUR">
					</div>
				</div>

				<div class="form-control">
					<label for="reason">Reason For Expense</label>
					<div>
						<textarea class="input-control" name="reason" id="reason" placeholder="Reason for Expenditure" cols="30" rows="10"></textarea>
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
	import Heading from "./Heading.vue"
	export default {
		name: 'Expense',
		data: ()=> ({

		}),
		components :{
			Heading
		}
	}
	
</script>


<style scoped>

	.parent-body {
		text-align: center;
		width: 100%;
	}
	header {
		margin-bottom: 50px;
		background-color: #42b983;
		height: 100px;
		display: flex;
		justify-content:center;
		font-size: 30px;
		color: #fff;
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
	}
</style>