<template>
	<div class="text-msg">
		<div :class="['text-msg__wrapper', { 'text-msg__wrapper--own': own }]">
			<p class="text-msg__content">{{ msg.content }}
				<span class="text-msg__time">{{ msgDate }}</span>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { MessageType } from "@/types/vuex"
import { defineComponent, PropType } from "vue"

export default defineComponent({
	name: 'text-message',
	props: {
		text: String,
		msg: {
			type: Object as PropType<MessageType>,
			default: {}
		}
	},
	computed: {
		msgDate(): string {
			return new Date(this.msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		},
		own(): boolean {
			return this.msg.sender === this.$store.getters.getUser._id
		}
	}
})
</script>

<style lang="scss" scoped>
.text-msg {
	width: 100%;
	display: flex;
	&__wrapper {
		background: #212121;
		padding: .3125rem .5rem .375rem;
		position: relative;
		cursor: pointer;
		border-radius: 6px;
		display: inline-block;
		max-width: 600px;
		&.text-msg__wrapper--own {
			margin-left: auto;
			background: #8774e1;
		}
	}
	&__time {
		position: relative;
		font-size: .75rem;
		white-space: nowrap;
		float: right;
		top: .375rem;
		bottom: auto !important;
		float: right;
		line-height: 1;
		margin-left: .4375rem;
		opacity: .5;
	}
	&__content {
		cursor: text;
		word-break: break-word;
	}
}
</style>