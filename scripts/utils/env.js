const env = process.env || {};

module.exports = {
  /* 掘金Cookie */
  COOKIE: `ttcid=1c3a41a7b3324becb1a34a9cd1eeaa0976; _tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227120782133140637224%2522%252C%2522user_unique_id%2522%253A%25227120782133140637224%2522%252C%2522timestamp%2522%253A1657936295276%257D; MONITOR_WEB_ID=0539e00d-0373-4543-bc80-905b4f8003f8; _ga=GA1.2.1211176950.1657936296; _gid=GA1.2.942648471.1657936296; tt_scid=IuU9-XLqzP.mk3lS-gqe2SVz-tQ-RBrr0ChOkXFRKNRzhUB8AhAvpqdgcGwLUxLib454; s_v_web_id=verify_l5n8gpp9_YvDlQahr_geMd_4vKH_AedS_FsgcWiVUtRVR; passport_csrf_token=a774492075f5312c3ed53cf8e6169511; passport_csrf_token_default=a774492075f5312c3ed53cf8e6169511; _tea_utm_cache_2018=undefined; MONITOR_DEVICE_ID=981815d9-acca-4561-acf3-a50edf2fdb80; n_mh=AB17_RkBUyFkd-nRz9NWf-QnqHCX-QhGK-TS2BRXQxg; sid_guard=e50585b45fb92438762966699e387409%7C1657936325%7C31536000%7CSun%2C+16-Jul-2023+01%3A52%3A05+GMT; uid_tt=b899c7b0fdae8f27af9c5670f4b8709e; uid_tt_ss=b899c7b0fdae8f27af9c5670f4b8709e; sid_tt=e50585b45fb92438762966699e387409; sessionid=e50585b45fb92438762966699e387409; sessionid_ss=e50585b45fb92438762966699e387409; sid_ucp_v1=1.0.0-KDVlOGE1ZDUwYjc4OTg5MDIxMTMyNjEzZDk5MzEwNjEwNjlhOGVmOWQKFwiNr8CN84z5BxDFs8iWBhiwFDgCQO8HGgJsZiIgZTUwNTg1YjQ1ZmI5MjQzODc2Mjk2NjY5OWUzODc0MDk; ssid_ucp_v1=1.0.0-KDVlOGE1ZDUwYjc4OTg5MDIxMTMyNjEzZDk5MzEwNjEwNjlhOGVmOWQKFwiNr8CN84z5BxDFs8iWBhiwFDgCQO8HGgJsZiIgZTUwNTg1YjQ1ZmI5MjQzODc2Mjk2NjY5OWUzODc0MDk`,
  /* 多用户掘金Cookie, 当有1名以上用户时填写, 支持同时最多可配置5名用户 */
  COOKIE_2: env.COOKIE_2,
  COOKIE_3: env.COOKIE_3,
  COOKIE_4: env.COOKIE_4,
  COOKIE_5: env.COOKIE_5,
  /**
   * 邮箱配置
   * user 发件人邮箱, pass, 发件人密码, to收件人
   */
  EMAIL_USER: env.EMAIL_USER,
  EMAIL_PASS: env.EMAIL_PASS,
  EMAIL_TO: env.EMAIL_TO,
  /**
   * 钉钉配置
   * https://open.dingtalk.com/document/robots/custom-robot-access
   */
  DINGDING_WEBHOOK: env.DINGDING_WEBHOOK,
  /**
   * PushPlus配置
   * http://www.pushplus.plus/doc/guide/openApi.html
   */
  PUSHPLUS_TOKEN: env.PUSHPLUS_TOKEN
};
