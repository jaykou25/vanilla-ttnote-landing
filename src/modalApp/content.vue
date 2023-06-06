<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title fs-6" id="exampleModalLabel">微信登录</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body text-center pb-4">
      <div class="codeWrapper">
        <img v-if="qrcode" class="code" :src="qrcode" />

        <span
          v-else
          role="img"
          aria-label="加载中"
          class="weui-primary-loading"
        ></span>

        <div v-if="maskShow" class="codemask">
          <i v-if="status === 'waiting'" class="icon_msg phone"></i>
          <i
            v-if="status === 'cancel'"
            role="img"
            title="强烈警告"
            class="weui-icon-warn weui-icon_msg"
          ></i>
        </div>
      </div>

      <div v-if="!status" class="codetext">
        请使用微信扫描二维码进行授权登录
      </div>
      <div v-if="status === 'waiting'" class="codetext">请在手机上进行确认</div>
      <div v-if="status === 'waiting'">
        <a @click="reset" href="javascript:;">重新扫描</a>
      </div>

      <div v-if="status === 'cancel'" class="codetext">你已取消此次操作</div>
    </div>
  </div>
</template>

<script>
import { loginQrcode, loginStatus } from "@/apis/index";

export default {
  data() {
    return {
      interval: undefined,
      qrcode: undefined,
      uuid: undefined,
      status: undefined,
    };
  },
  computed: {
    maskShow() {
      return (
        this.status === "cancel" ||
        this.status === "waiting" ||
        this.status === "confirm"
      );
    },
  },
  created() {
    this.init();
  },
  unmounted() {
    clearInterval(this.interval);
  },
  watch: {
    status(val) {
      if (val === "cancel" || val === "confirm") {
        clearInterval(this.interval);
      }
    },
  },
  methods: {
    queryQrcode() {
      return loginQrcode().then((res) => {
        this.qrcode = res.qrcode;
        this.uuid = res.uuid;
      });
    },
    init() {
      this.queryQrcode().then(() => {
        this.interval = setInterval(() => {
          loginStatus({ uuid: this.uuid }).then((res) => {
            this.status = res.status;

            if (res.status === "confirm") {
              localStorage.setItem("token", res.token);
              window.location = "/note";
            }
          });
        }, 1000);
      });
    },
    reset() {
      this.status = undefined;
      clearInterval(this.interval);
      this.init();
    },
  },
};
</script>
