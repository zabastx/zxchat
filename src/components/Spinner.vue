<template>
	<div class="spinner">
		<div class="spinner__wrapper"></div>
		<div class="half-circle-spinner">
			<div class="circle circle-1"></div>
			<div class="circle circle-2"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: 'spinner'
})
</script>

<style lang="scss" scoped>
.spinner {
	position: absolute;
	z-index: 100;
	width: 100%;
	height: 100%;
	&__wrapper {
		width: 100%;
		height: 100%;
		background: #000;
		opacity: .5;
		position: absolute;
	}
}

.half-circle-spinner, .half-circle-spinner * {
	box-sizing: border-box;
}

.half-circle-spinner {
	width: 60px;
	height: 60px;
	border-radius: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.half-circle-spinner .circle {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 100%;
	border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
	border-top-color: #fff;
	animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
	border-bottom-color: #fff;
	animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
	0% {
		transform: rotate(0deg);

	}
	100%{
		transform: rotate(360deg);
	}
}
</style>