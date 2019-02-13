import Vue from "vue"
import Router from "vue-router"

//components
import AllExpense from "./components/AllExpense.vue"
import AddExpense from "./components/AddExpense.vue"

Vue.use(Router)

export default new Router({
	"mode": "history",
	routes: [
		{
			path: "/",
			name: 'AllExpense',
			component: AllExpense
		},
		{
			path: "/expense",
			name: 'Expense',
			component: AddExpense
		},
		{
			path: "**",
			component: AllExpense
		},

	]
})