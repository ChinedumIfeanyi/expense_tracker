<template>
	<div> All expense</div>
</template>

<script>
	import axios from "axios"

	export default {
		name: 'AllExpense',
		data(){
			return {

			}
		},
		methods:{
			fetchExpense(){
				axios.get("http://localhost:3500/api/all"
				)
				.then(response => console.log(response.data))
			}
		},
		created(){
			this.fetchExpense()
		}
	}
</script>


<style></style>