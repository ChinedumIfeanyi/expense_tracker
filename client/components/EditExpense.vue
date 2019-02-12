<template>
	<div> Edit {{$route.params.id}}
	<section>
		<form action="">
			<div>
				
			</div>
		</form>
	</section>

	</div>
	
</template>


<script>
	import axios from "axios"
	export default {
		name: 'EditExpense',
		data: ()=>({
			data: {}
		}),
		created(){
			this.getExpense()
		},
		methods:{
			getExpense(){
				axios.get(`/expense/${this.$route.params.id}` )
				.then(response => this.data = response.data[0] ) 
			}
		}
	}
</script>

<style>
	
</style>