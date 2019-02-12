<template>
	<div class="container">
		<router-view :key="$route.fullPath"></router-view>	</div>
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