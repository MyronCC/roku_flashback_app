import UserComponent from './UserComponent.js';

export default {
	template: `
	<div class="AlluserContainer">
		<div class="row userTitle">
			<div class="col-sm-12">
				<h1 class="user-message">{{ message }}</h1>
			</div>
		</div>

		<div class="row users">
			<user v-for="(user, index) in userList" :liveuser="user" :key="index" />
		</div>
	</div>
	`,

	created: function () {
		this.fetchAllUser();
	},

	data() {
		return {
			message: `Who's Using Roku?`,

			userList: []
		}
	},

	methods:{
		fetchAllUser(){
			let url = './admin/admin_getusers.php?allusers=true';

			fetch(url)
			.then(res => res.json())
			.then(data => this.userList = data)
			.catch((error) => console.error(error))
		}
	},
	components:{
		user:UserComponent
}
}
