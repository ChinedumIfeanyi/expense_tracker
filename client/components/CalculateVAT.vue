<template>
	<div>
		<!-- calculate value added tax  -->	
		<p> value added tax ( VAT )</p>
		<p> {{ VatAmount }} EUR</p>
	</div>
</template>


<script>
	export default {
		name: "CalculateVAT",
		data: () => ({
		}),
		props: ['grossAmount', 'symbol'],
		computed:{
			VatAmount(){
				if(this.symbol !== 'EUR'){
					return 'Symbol must be in '
				}else{

					return Math.trunc( ( parseFloat(this.grossAmount) / (1 + (20/100) ) - parseFloat(this.grossAmount) ) * -1 )
				}

				
			}
		}
	}
	
</script>
