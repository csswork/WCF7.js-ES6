import axios from 'axios';
// import velocity from 'velocity-animate';
// import serialize from './FormSerialize';

class Form {
	constructor($el, homeUrl) {
		this.version = '0.0.1';
		this.$el = $el;
		this.$response = this.$el.querySelector('.wpcf7-response-output');
		this.form = this.$el.querySelector('form');
		this.id = this.getId();
		this.api = homeUrl + '/wp-json/contact-form-7/v1/contact-forms/' +this.id+ '/feedback';
		this.$loading = document.createElement('div');
	}

  	/**
	 * Init class
	 */
	init() {
		let self = this;

		self.$loading.className = 'loading';
		self.$loading.innerHTML = '<div>Loading</div>';
		self.$el.appendChild(self.$loading)

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

		self.$el.querySelectorAll('span.wpcf7-form-control-wrap').forEach(e => { 
			e.classList.remove('error');
		});

		// velocity(self.$loading, 'fadeIn', 100);
		self.$loading.style.display = 'block';

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
				self.$response.innerHtml = response.data.message;
				
				if (response.data.status === 'validation_failed') {
					response.data.invalidFields.forEach(item => {
						let el = self.$el.querySelector(item.into);
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
				self.$loading.style.display = 'none';

			})
			.catch(function (response) {
				// handle error
				self.$loading.style.display = 'none';
				console.log(response);
			});

		e.preventDefault();
	}

	/**
	 * Get form id
	 */
	getId() {
		let input = this.$el.querySelector('input[name="_wpcf7"]');
		return parseInt( input.value, 10 );
	};
};

export { Form as default};