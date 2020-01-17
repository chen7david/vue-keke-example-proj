<template>
	<section class="content login-tips">
		<div class="title" >信息审核</div>
		<div class="body-centent">
			<h2>尊敬的客户，您好。</h2>

			<div v-if="status === '0' || status == 1">
				<p>您提交的注册材料正在审核中，审批结果会在三个工作日内发送至联系人手机以及电子邮箱，请注意查收。谢谢。</p>
				<p>如有疑问请联系服务热线：
					<span class="c-org2"> {{ CONSUMER_PHONE }} </span>
				</p>

			</div>
			<!-- 补全资料这步废弃 -->
			<!-- <div v-if="status == 3">
        <p>感谢您的关注，贵司提交的注册材料已通过审核。请前往补全企业信息，谢谢。</p>
        <p class="f">
          <router-link class="c-yellow" :to="{name:'enterprise-add'}">立即前往补全企业信息</router-link>
        </p>
      </div> -->

			<div v-if="status == 5">
				<p>您提交的企业材料正在前往审核的路上，结果会在三个工作日内发送至联系人手机以及电子邮箱，请注意查收。谢谢。</p>
				<p class="f">如有疑问请联系服务热线：
					<span class="c-org2"> {{ CONSUMER_PHONE }} </span>
				</p>
			</div>
			<div v-if="status == 6">
				<p>贵司提交的企业材料未通过审核，请前往企业信息更新后，重新提交。谢谢。</p>
				<p class="f">
					<router-link class="c-yellow" :to="{name:'enterprise-edit'}">立即前往修改</router-link>
				</p>
			</div>

		</div>
	</section>

</template>

<script>
export default {
    name: 'login-tips',
    data () {
        return {
            status: this.$route.query.status
        }
    }
}
</script>

<style lang="stylus" scoped>
.body-centent {
	padding: 50px 60px;
	min-height: 600px;
	font-size: 14px;

	p {
		line-height: 25px;
		padding-bottom: 10px;
	}

	h2 {
		padding: 15px 0;
		font-size: 20px;
		line-height: 40px;
	}

	.f {
		padding: 30px 0;
	}
}
</style>
