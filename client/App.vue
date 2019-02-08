<template>
	<div class="container">
		<all-expense></all-expense>
	</div>
</template>

<script>
	import AllExpense from "./components/AllExpense.vue"

	export default {
		name: "App",
		data: ()=>({

		}),
		components: {
			AllExpense
		}
	}
	
</script>

<style scoped>
.container {
	width: 100%;
}
	
</style>