import 'mosha-vue-toastify/dist/style.css'
import { createToast } from 'mosha-vue-toastify'

/**
 * Notification snackbar
 * @param {String} text - текст в оповещении
 * @param {('success'|'danger'|'info'|'warning'|'default')} type - тип оповещения
 */

export function toastify(type: any, text: string) {
	createToast(text, {
		position: 'bottom-center',
		type,
		transition: 'slide',
		swipeClose: true,
		showIcon: true,
		hideProgressBar: true,
		timeout: 2000,
		showCloseButton: true,
	})
}