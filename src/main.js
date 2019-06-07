import axios from 'axios';
import velocity from 'velocity-animate';
// import serialize from './FormSerialize';

class Form {
	constructor($form) {
		this.version = '0.0.1';
		this.$form = $form;
		this.$response = this.$form.querySelector('.wpcf7-response-output');
		this.form = this.$form.querySelector('form');
		this.id = this.getId();
		this.api = window.globals.home_url + '/wp-json/contact-form-7/v1/contact-forms/' +this.id+ '/feedback';
		this.$loading = document.createElement('div');
	}

  	/**
	 * Init class
	 */
	init() {
		let self = this;

		self.$loading.className = 'loading';
		self.$loading.innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
		self.$form.appendChild(self.$loading)

		self.form.addEventListener('submit', function(e) {
			self.submit(e);
		});
	}


	/**
	 * Submit form
	 */
	submit(e) {
		let self = this;
		let formData = new FormData(self.form);

		self.$form.querySelectorAll('span.wpcf7-form-control-wrap').forEach(e => { 
			e.classList.remove('error');
		});

		velocity(self.$loading, 'fadeIn', 100);

		axios({
				method: 'POST',
				url: self.api,
				data: formData,
	 			config: { 
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			})
			.then(function (response) {
				// handle success
				// validation_failed
				self.$response.innerHtml = response.data.message;
				
				if (response.data.status === 'validation_failed') {
					response.data.invalidFields.forEach(item => {
						let el = self.$form.querySelector(item.into);
						el.classList.add('error');
					});

					self.$response.classList.remove('success');
					self.$response.classList.add('error');
				} else {
					self.$response.classList.remove('error');
					self.$response.classList.add('success');
					self.form.reset();
				}

				self.$response.innerHTML = response.data.message;
				velocity(self.$loading, 'fadeOut', 100);
			})
			.catch(function (response) {
				// handle error
				velocity(self.$loading, 'fadeOut', 100);
				console.log(response);
			});

		e.preventDefault();
	}

	/**
	 * Get form id
	 */
	getId() {
		let input = this.$form.querySelector('input[name="_wpcf7"]');
		return parseInt( input.value, 10 );
	};
};

export { Form as default};