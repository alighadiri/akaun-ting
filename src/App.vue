<template lang="pug">
	v-app
		transition(name="fade")
			router-view 
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~vuetify/src/styles/styles.sass";
@import "./scss/app";


</style>
