/*  
  Power by Dr0.
  牢牢记住，逝者为大！
  See You Again
  update in 2023/12/3
  请注意，App.js 的 pushMessage函数只能使用react对象 
  html使用: pushMessage(rawhtml('html'))
*/

import React, { Fragment } from "react";
import { createAsk, createInput } from "./pop";
import image_whitelist from "./image_whitelist";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  ContextMenu,
  showMenu,
  hideMenu,
  longPress,
  showMenuEx,
  fuckALLMenu,
} from "./meum";
import useSyncCallback from "./useSyncCallback";
const $ = (e) => document.querySelector(e);
const $lsget = (e) => localStorage[e] || false;
const $lsset = (k, v) => (localStorage[k] = v);
var temp_log = [];
console._log = console.log;
// console.log = (...e) =>
//   !console._log(e) && temp_log.push({ time: formattedDate(), obj: e });
const fuckDefaultMenu = (e) =>
  console.log("fuckDef menu", e.preventDefault(), "1");
const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
const nullStr = (s) => s == "" || s == undefined || s == null;
const getUuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
const formattedToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
};
const getMin = (old) => Math.floor((Date.now() - old) / 1000);
var loaded = false;
const copyToClip = (content) => {
  console.log("content", content);
  var aux = document.createElement("input");
  aux.setAttribute("value", content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
};
const formattedDate = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${year}/${month}/${day} ${
    hours < 10 ? "0" + hours : hours
  }:${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  return formattedDate;
};

/*********************************************************************************************************************************** */
var global_config = {
  client_name: "小张聊天室 IM版",
  client_title: "IM - ZhangChat",
  windowActive: true,
  lastSent: [""],
  lastSentPos: 0,
  unread: 0,
  ws_urls: [
    ["wss://chat.zhangsoft.link/ws", "主线路 (Cloudflare)"],
    ["wss://rain.chat.zhangsoft.link/ws", "备用线路 (雨云)"],
  ],
  isMobile: isMobile(),
  pageMode: decodeURI(window.location.search.replace(/^\?/, "")) == "",
  modData: JSON.parse(localStorage["modData"] || "null"),
  onloads: [],
  modAction: [
    { text: "无", data: null },
    { text: "踢出", data: { cmd: "kick" } },
    { text: "封禁", data: { cmd: "ban" } },
    { text: "禁言1分钟", data: { cmd: "dumb", time: 1 } },
    { text: "禁言5分钟", data: { cmd: "dumb", time: 5 } },
    { text: "禁言10分钟", data: { cmd: "dumb", time: 10 } },
    { text: "永久禁言", data: { cmd: "dumb", time: 0 } },
  ],
  imgHostWhitelist: image_whitelist, //image_whitelist.js
  themes: [
    "amber",
    "bubblegum",
    "chelseagem",
    "jewel",
    "lime",
    "pinescent",
    "pink",
    "strawberry",
  ],
  indexPage: [
    "# [小张聊天室](https://chat.zhangsoft.link) - IM模式客户端",
    "Powered by [Dr0](https://githubfast.com/redble)",
    "---",
    "欢迎来到小张聊天室，这是一个黑客风格的聊天室。",
    '注意：在这里，我们把"房间（chatroom）"称作"频道（channel）"。',
    "公共频道（在线用户多）：[?chat](/?chat)",
    `您也可以自己创建频道，只需要按照这个格式打开网址即可：\n${document.URL}?房间名称`,
    `这个是为您准备的频道（只有您自己）： ?${Math.random()
      .toString(36)
      .substr(2, 8)}`,
    "---",
    "本聊天室依照中华人民共和国相关法律，保存并公布您的聊天记录。",
    "无论您是否在中国境内，都请自觉遵守中华人民共和国相关法律和聊天室内相关规定。",
    "您如果对本聊天室不满意或认为受到不公平对待，则可以选择向管埋员申诉或选择离开。",
    "---",
    "您知道吗？这个聊天室原本是[MelonFish](https://gitee.com/XChatFish)交给[MrZhang365](https://blog.mrzhang365.cf)开发的XChat聊天室。",
    "但是由于某些原因，它被开发者魔改成了现在的小张聊天室。",
    "XChat基于HackChat，HackChat的GitHub仓库地址为：\nhttps://githubfast.com/hack-chat/main",
    "小张聊天室的仓库地址为：https://githubfast.com/ZhangChat-Dev-Group/ZhangChat",
    "在此对HackChat的开发者深表感谢。",
    "---",
    "本聊天室开发者：",
    "@MrZhang365 - [小张的博客](https://blog.mrzhang365.cf/) && [小张软件](https://www.zhangsoft.cf/)",
    "@paperee - [纸片君ee的个人主页](https://paperee.guru/)",
    "---",
    "更多代码贡献者：",
    "@[4n0n4me](http://githubfast.com/xjzh123/) - 编写了[hackchat\\+\\+客户端](https://hc.thz.cool/)",
    "@[Dr0](https://githubfast.com/redble) - IM客户端",
    "---",
    "友情链接：",
    "[HackChat聊天室](https://hack.chat/)",
    "[hackchat\\+\\+客户端](https://hc.thz.cool/)",
    "[TanChat聊天室](https://tanchat.fun/)",
    "[ZhangChat增强脚本](https://greasyfork.org/zh-CN/scripts/458989-zhchat%E5%A2%9E%E5%BC%BA%E8%84%9A%E6%9C%AC)",
    "---",
    `2023.02.23~${formattedToday()} [小张聊天室开发组](https://githubfast.com/ZhangChat-Dev-Group) 致`,
  ].join("\n"),
  hls: ["darcula", "rainbow", "zenburn", "androidstudio"],
  level: {
    marks: ["none", "onlytext", "onlyemoji"],
    mark: localStorage["level"] || "none",
    arr: [],
  },
  sidebar_conf: {},
  first_init: localStorage["init"] == "true",
  init_conf: {
    "pin-sidebar": !isMobile(),
    "fun-system": true,
    "send-btn": isMobile(),
    "joined-left": true,
    "show-head": true,
    "allow-image": true,
    "syntax-highlight": true,
    "parse-latex": true,
  },
  md: {
    md: null,
    markdownOptions: {
      html: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: "",
      linkify: true,
      linkTarget: '_blank" rel="noreferrer',
      typographer: true,
      quotes: `""''`,
      doHighlight: true,
      langPrefix: "hljs language-",
      highlight: function (str, lang) {
        if (!global_config.md.markdownOptions.doHighlight || !window.hljs) {
          return "";
        }
        //console.log('hightlight work');
        if (lang && window.hljs.getLanguage(lang)) {
          // console.log('hightlight work2');
          try {
            return window.hljs.highlight(lang, str).value;
          } catch (__) {
            // nothing
          }
        }

        try {
          return window.hljs.highlightAuto(str).value;
        } catch (__) {
          // nothing
        }

        return "";
      },
    },
    init() {
      // 初始化Markdown
      let Remarkable = window.Remarkable;
      let md = new window.Remarkable("full", global_config.md.markdownOptions);
      md.renderer.rules.image = function (tokens, idx, options) {
        var src = Remarkable.utils.escapeHtml(tokens[idx].src);

        if (
          global_config.ui.isWhiteListed(src) &&
          global_config.sidebar_conf["allow-image"]
        ) {
          var imgSrc = ` src="${Remarkable.utils.escapeHtml(tokens[idx].src)}"`;
          var title = tokens[idx].title
            ? ` title="${Remarkable.utils.escapeHtml(
                Remarkable.utils.replaceEntities(tokens[idx].title)
              )}"`
            : "";
          var alt = ` alt="${
            tokens[idx].alt
              ? Remarkable.utils.escapeHtml(
                  Remarkable.utils.replaceEntities(
                    Remarkable.utils.unescapeMd(tokens[idx].alt)
                  )
                )
              : ""
          }"`;
          var suffix = options.xhtmlOut ? " /" : "";
          var scrollOnload = global_config.ui.isAtBottom()
            ? ' onload="window.scrollTo(0, document.body.scrollHeight)"'
            : "";
          return `<a href="${src}" target="_blank" rel="noreferrer"><img${scrollOnload}${imgSrc}${alt}${title}${suffix} class="text"></a>`;
        } else if (
          global_config.ui.isAudioFile(src) &&
          global_config.sidebar_conf["allow-audio"]
        ) {
          var audioSrc = ` src="${Remarkable.utils.escapeHtml(
            tokens[idx].src
          )}"`;
          var title = tokens[idx].title
            ? ` title="${Remarkable.utils.escapeHtml(
                Remarkable.utils.replaceEntities(tokens[idx].title)
              )}"`
            : "";
          var alt = ` alt="${
            tokens[idx].alt
              ? Remarkable.utils.escapeHtml(
                  Remarkable.utils.replaceEntities(
                    Remarkable.utils.unescapeMd(tokens[idx].alt)
                  )
                )
              : ""
          }"`;
          var suffix = options.xhtmlOut ? " /" : "";
          var scrollOnload = global_config.ui.isAtBottom()
            ? ' onload="window.scrollTo(0, document.body.scrollHeight)"'
            : "";
          return `<a href="${src}" target="_blank" rel="noreferrer"><audio ${scrollOnload}${audioSrc}${alt}${title}${suffix} controls></audio></a>`;
        }

        return `<a href="${src}" target="_blank" rel="noreferrer">${Remarkable.utils.escapeHtml(
          Remarkable.utils.replaceEntities(src)
        )}</a>`;
      };

      md.renderer.rules.link_open = function (tokens, idx, options) {
        var title = tokens[idx].title
          ? ` title="${Remarkable.utils.escapeHtml(
              Remarkable.utils.replaceEntities(tokens[idx].title)
            )}"`
          : "";
        var target = options.linkTarget
          ? ` target="${options.linkTarget}"`
          : "";
        return `<a rel="noreferrer" onclick="return global_config.ui.verifyLink(this)" href="${Remarkable.utils.escapeHtml(
          tokens[idx].href
        )}"${title}${target}>`;
      };

      md.renderer.rules.text = function (tokens, idx) {
        tokens[idx].content = Remarkable.utils.escapeHtml(tokens[idx].content);

        if (tokens[idx].content.indexOf("?") !== -1) {
          tokens[idx].content = tokens[idx].content.replace(
            /(^|\s)(\?)\S+?(?=[,.!?:)]?\s|$)/gm,
            function (match) {
              var channelLink = Remarkable.utils.escapeHtml(
                Remarkable.utils.replaceEntities(match.trim())
              );
              var whiteSpace = "";

              if (match[0] !== "?") {
                whiteSpace = match[0];
              }

              return `${whiteSpace}<a href="${channelLink}" target="_blank">${channelLink}</a>`;
            }
          );
        }

        return tokens[idx].content;
      };
      md.use(window.remarkableKatex);
      global_config.md.md = md;
      return md;
    },
  },
  ui: {
    initIndexPage() {
      global_config.pushMessage(
        rawhtml(`
      <style>
            
          body {
            padding:2em;
            line-height:1.4;
          }
         .indexpage {}
         .indexpage h1,
         .indexpage h2
          {
            line-height:0.5;
          }
          @media only screen and (max-width:700px) {
            body{
              padding:1em;
            }
          }
          @media only screen and (max-width:400px) {
            body{
              padding:10px;
            }
          }
          .cmessages {
            padding-top:0;
           
          }
          .container {
            max-width:100%;
          }
  
      </style>
      `)
      );
      document.body.className = "notice_back_color";
      global_config.pushMessage(
        <div
          class="notice_back_color indexpage"
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: "5px",
            justifyContent: " center",
            // padding: "2em",
          }}
        >
          <span
            id="_index_page"
            style={{
              fontSize: "100%",
            }}
            dangerouslySetInnerHTML={{
              __html: global_config.md.md.render(global_config.indexPage),
            }}
          />
        </div>
      );
    },
    openNewLink(link) {
      let a = document.createElement("a");
      a.setAttribute("href", link);
      a.setAttribute("target", "_blank");
      a.click();
    },
    verifyLink(link) {
      var linkHref = window.Remarkable.utils.escapeHtml(
        window.Remarkable.utils.replaceEntities(link.href)
      );

      if (linkHref !== link.innerHTML)
        createAsk(`等一下！`, `你即将前往：${linkHref}`, (e) => {
          // console.log(e);
          if (e) this.openNewLink(link);
        });
      else return true;

      return false;
    },
    updateTitle() {
      if (global_config.windowActive && global_config.ui.isAtBottom()) {
        global_config.unread = 0;
      }

      if (global_config.ws.hasChannel()) {
        global_config.client_title = global_config.ws.channel;

        if (global_config.unread > 0) {
          global_config.client_title = `（${global_config.unread}）${global_config.client_title}`;
        }
      }

      document.title = `${global_config.client_title} - ${global_config.client_name}`;
    },
    //清屏
    clearMessages() {
      createAsk(
        "清空消息",
        "确定要清空全部消息吗?",
        (e) =>
          e &&
          !global_config.doMessage((e) => []) &&
          pushInfoEx("历史记录已清空")
      );
    },
    //一起看视频
    SeeYouAgain() {
      global_config.ws.send({ cmd: "get-video" });
    },
    async setvideo() {
      await new Promise((good, fuck) => {
        createInput(
          "设置视频",
          "请输入视频文件地址（留空则清除公共视频）：",
          (e) => {
            e.input ? good(e.input) : fuck("");
          }
        );
      })
        .then((e) => {
          global_config.ws.send({
            cmd: "set-video",
            url: e,
          });
        })
        .catch((e) => !"" && pushWarn("您取消了设置视频"));
    },
    isAtBottom() {
      // console.log(window.innerHeight, window.scrollY, document.body.scrollHeight);
      // console.log('isAtbottom', (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1));
      return (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 1
      );
    },
    setPageWidth(j) {
      $("#main_container").style.maxWidth = j;
    },
    updatePageWidth() {
      // console.log('update page width');
      //console.log(global_config.sidebar_conf);
      if (
        !global_config.sidebar_conf["pin-sidebar"] &&
        document.body.clientWidth >= 600
      ) {
        global_config.ui.setPageWidth(document.body.clientWidth - 100 + "px");
        // console.log('width big 600px and no pin sidebar');
        return;
      } else global_config.ui.setPageWidth("600px");
      let w = document.body.clientWidth - 530;
      if (w > 600) {
        //console.log('width big then 600px');
        global_config.ui.setPageWidth(w + "px");
      } else global_config.ui.setPageWidth("600px");
    },
    updateInputSize() {
      try {
        //debugger;
        var atBottom = this.isAtBottom();
        var input = $("#chatinput");
        input.style.height = 0;
        input.style.height = input.scrollHeight + "px";
        document.body.style.marginBottom =
          $("#footer").offsetHeight + 10 + "px";

        if (atBottom) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      } catch (e) {
        alert(e.message);
      }
    },
    insertAtCursor(text) {
      var input = $("#chatinput");
      var start = input.selectionStart || 0;
      var before = input.value.substr(0, start);
      var after = input.value.substr(start);

      before += text;
      input.value = before + after;
      input.selectionStart = input.selectionEnd = before.length;

      this.updateInputSize();
    },
    getDomain(link) {
      var a = document.createElement("a");
      a.href = link;
      return a.hostname;
    },
    isWhiteListed(link) {
      return (
        global_config.imgHostWhitelist.indexOf(
          global_config.ui.getDomain(link)
        ) !== -1
      );
    },
    isAudioFile(filename) {
      var audioRegex = /\.(mp3|wav|ogg|mp4|flac|m4a|aac)$/i;
      return audioRegex.test(filename);
    },
    quoteMessage(e) {
      if (e.html) {
        if (!global_config.showHtmlCode) return;
        pushInfoEx("```html\n" + e.text);
        return;
      }
      var replyText = buildReplyText(
        { nick: e.nick, trip: e.trip || "" },
        e.text
      );
      replyText += $("#chatinput").value;
      $("#chatinput").value = "";
      global_config.ui.insertAtCursor(replyText);
      $("#chatinput").focus();
    },
    userModAction(nick, _modCmd = global_config.modData) {
      let toSend = _modCmd;

      if (_modCmd == null) {
        //如果未设置
        return pushWarn("您尚未设置管理员操作");
      }
      toSend.nick = nick;
      global_config.ws.send(toSend);
    },
  },
  ws: {
    chatws: null,
    url: localStorage["ws_url"] || "wss://chat.zhangsoft.link/ws",
    client: "Dr0IMClient",
    channel: decodeURI(window.location.search.replace(/^\?/, "")),
    head: localStorage["head"] || "",
    isConnect: false,
    nowConnect: 0,
    maxConnect: 5,
    isNeedReload: false,
    rawnick: localStorage["nick"] || "",
    nick: localStorage["nick"] ? localStorage["nick"].split("#")[0] : "",
    joinPayload: null,
    sethead() {
      createInput(
        "设置头像",
        "头像地址 (留空为默认)",
        (e) => {
          global_config.ws.head = localStorage["head"] = e.input || "";
        },
        global_config.ws.head
      );
    },
    _init({ open, close, message, url }) {
      let t = new WebSocket(url);
      t.onopen = open;
      t.onmessage = message;
      t.onclose = close;
      this.chatws = t;
    },
    send(e) {
      let ws = this.chatws;
      if (ws && ws.readyState === ws.OPEN) ws.send(JSON.stringify(e));
    },
    init(_channel, nick) {
      var shouldconnect = false;
      global_config.ws._init({
        url: this.url,
        open: async () => {
          let temp_nick = nick;
          if (this.isConnect) return;
          if (!global_config.sidebar_conf["auto-login"] || nullStr(temp_nick)) {
            temp_nick = await new Promise((good, fuck) =>
              createInput(
                "请输入呢称",
                "呢称",
                (e) => {
                  if (!e.state)
                    fuck("你取消了加入。 在输入框上按回车可以重新加入。");
                  else if (nullStr(e.input))
                    fuck(
                      "昵称只能由中文、字母、数字和下划线组成，且不能超过24个字符呢称不能为空"
                    );
                  else good(e.input);
                },
                nick
              )
            )
              .then(
                (e) =>
                  (shouldconnect =
                    true &&
                    (localStorage["nick"] = global_config.ws.rawnick = e))
              )
              .catch((e) => !(shouldconnect = false) && pushWarn(e));
            shouldconnect && (global_config.ws.nick = temp_nick.split("#")[0]);
          }
          if (shouldconnect || global_config.sidebar_conf["auto-login"]) {
            this.joinPayload = {
              cmd: "join",
              channel: _channel,
              client: this.client,
              nick: temp_nick,
            };

            this.send(this.joinPayload);
            this.isConnect = true;
          }
        },
        close: () => {
          this.isConnect = false;
          if (this.nowConnect > this.maxConnect) {
            this.isNeedReload = true;
            pushWarn("重连次数太多，请刷新页面");
            return;
          } else this.join();
          this.nowConnect++;
        },
        message: (j) =>
          ((e) => {
            let find_command = global_config.commands[e.cmd];
            if (find_command) find_command(e);
          })(JSON.parse(j.data)),
      });
    },
    hasChannel: () => global_config.ws.channel != "",
    join(channel) {
      if (this.channel && channel == undefined) channel = this.channel;
      this.init(channel, this.rawnick);
    },
    chat(text) {
      this.send({ cmd: "chat", text, head: this.head });
    },
    invite(nick) {
      this.send({ cmd: "invite", nick });
    },
  },
  users: {
    onlineusers: [],
  },
  commands: {
    chat: (e) => global_config.pushMessage(BubbleBuilderEx(e)),
    changeNick(e) {
      if (e.nick == global_config.ws.nick) {
        global_config.ws.nick = e.text;
      }
      global_config.users.changeNick({ rawnick: e.nick, nick: e.text });
      pushInfoEx(`${e.nick} 更名为 ${e.text}`);
    },
    onlineSet(e) {
      pushInfoEx(`在线用户：${e.nicks.join(", ")}`);
      pushWelcomeButton("欢迎一下");
      global_config.users.set(e.users);
    },
    onlineRemove(e) {
      global_config.users.remove({ nick: e.nick });
      pushInfoEx(`${e.nick} 离开了聊天室`);
    },
    onlineAdd(e) {
      //console.log("onlineadd", e);
      var nick = e.nick;
      global_config.users.add({ nick: e.nick, trip: e.trip });

      if (global_config.sidebar_conf["joined-left"]) {
        if (!global_config.sidebar_conf["fun-system"]) {
          var joinNotice = `${nick} 加入了聊天室`;
        } else {
          const test = ["活蹦乱跳", "可爱", "美丽", "快乐", "活泼", "美味"];
          const test2 = ["误入", "闯入", "跳进", "飞进", "滚进", "掉进"];
          var joinNotice = `${
            test[Math.round(Math.random() * (test.length - 1))]
          }的 ${nick} ${
            test2[Math.round(Math.random() * (test2.length - 1))]
          }了聊天室`;
        }

        joinNotice += e.client ? `\nTA正在使用 ${e.client}` : "";
        joinNotice += e.auth ? `\n系统认证：${e.auth}` : "";
        if (e.trip) {
          joinNotice += `\n识别码：${e.trip}`;
        }

        pushInfoEx(joinNotice); // 仿Discord

        if (global_config.sidebar_conf["fun-system"]) {
          pushWelcomeButton("欢迎一下");
        }
      }
    },
    history(j) {
      global_config.doMessage((e) => {
        return [
          ...e,
          ...j.history.map((args) =>
            BubbleBuilder({
              me: args.nick == global_config.ws.nick,
              nick: args.nick,
              trip: args.trip,
              head: args.head || undefined,
              text: args.text,
              args,
              id: args.id,
              color: args.color,
              time: args.time,
            })
          ),
        ];
      });

      // e.history.forEach((j) => global_config.commands.chat(j));
      pushInfoEx("—— 以上是历史记录 ——");
    },
    "set-video": (e) => {
      global_config.pushMessage(
        <div className="center">
          <video width={"90%"} controls>
            <source src={e.url}></source>
          </video>
        </div>
      );
    },
    captcha: (e) => {
      let captcha_obj;
      pushInfoEx("当前频道认为你不是人，所以请先完成下面的人机验证：");
      const captchaCallback = (e) => {
        global_config.doMessage((j) => j.filter((e) => e != captcha_obj));
        pushInfoEx("已确认你是人，正在加入频道，请稍等片刻...");
        if (!global_config.ws.joinPayload)
          return pushWarnEx(
            "发生未知错误：找不到存档的join包\n请尝试刷新网页。"
          );
        global_config.ws.joinPayload.captcha = e;
        global_config.ws.send(global_config.ws.joinPayload);
      };
      global_config.pushMessage(
        (captcha_obj = BubbleBuilderEx(
          {
            nick: "cloudflare",
            trip: "验证码",
            _react_obj: true,
            text: <Turnstile siteKey={e.sitekey} onSuccess={captchaCallback} />,
          },
          true
        ))
      );
    },
    info: (e) => {
      pushInfo({ text: e.text, time: e.time });
      console.log(e);
    },
    warn: (e) => {
      pushWarn({ text: e.text, time: e.time });
      console.log(e);
    },
    delmsg: (e) => {
      global_config.doMessage((j) =>
        j.map((u) => {
          if (u.props.id && u.props.id == e.id) {
            u = (
              <Widget type={"info"} text={u.props.nick + " 撤回了一条消息"} />
            );
          }
          return u;
        })
      );
    },
    html: (e) => {
      if (!global_config.sidebar_conf["allow-html"]) {
        return pushWarn(
          `您收到了一条来自 ${e.nick} 的 HTML信息，但是由于您不允许显示HTML信息，因此我们屏蔽了它`
        );
      }
      global_config.pushMessage(BubbleBuilderEx(e, true));
    },
  },
};
window.global_config = global_config;
/********************************************************************************************************************************************* */
const rawhtml = (e) => (
  <div key={getUuid()} dangerouslySetInnerHTML={{ __html: e }} />
);
const Change = (d, t) => (document.querySelector("#" + d).href = t);
const ChangeTheme = (t) => {
  Change("theme", `css/theme/${t}.css`);
  return t;
};
const ChangeHlight = (t) => {
  Change("hlight", `vendor/hljs/styles/${t}.min.css`);
  return t;
};
const ChangeLevel = (t) => {
  global_config.level.mark = t;
  global_config.level.arr.forEach((e) => e.setbubbleClass(t));
  return t;
};
/* -------------------------------------------------------------- */
function Button(props) {
  return (
    <button className="weui-btn weui-btn_mini weui-hotarea" {...props}>
      {props.children}
    </button>
  );
}
function Users(props) {
  let [users, setusers] = React.useState([]);
  let User = (nick, trip) => (
    <li key={getUuid()} nick={nick} trip={trip}>
      <a
        onClick={() => global_config.ws.invite(nick)}
        onContextMenu={(e) =>
          !e.preventDefault() && global_config.ui.userModAction(nick)
        }
      >
        {nick}
      </a>
      {trip ? <span className="usertrip">{trip}</span> : null}
    </li>
  );
  global_config.users.set = (e) =>
    setusers((u) => [
      ...(u = (global_config.users.onlineusers = e).map((j) =>
        User(j.nick, j.trip)
      )),
    ]);
  global_config.users.remove = (e) => {
    if (global_config.users.onlineusers.find((j) => j.nick == e.nick)) {
      global_config.users.onlineusers = global_config.users.onlineusers.filter(
        (k) => k.nick != e.nick
      );
      setusers((u) => [...u.filter((j) => j.props.nick != e.nick)]);
    }
  };
  global_config.users.changeNick = (e) => {
    let isfind = false;
    global_config.users.onlineusers = global_config.users.onlineusers.map(
      (j) => {
        if (j.nick == e.rawnick) {
          j.nick = e.nick;
          isfind = true;
        }
        return j;
      }
    );
    console.log(users);
    setusers((u) => [
      ...u.map((j) =>
        j.props.nick == e.rawnick ? User(e.nick, j.props.trip ?? null) : j
      ),
    ]);
  };
  global_config.users.add = (e) => {
    if (!global_config.users.onlineusers.find((j) => j.nick == e.nick)) {
      global_config.users.onlineusers.push({ nick: e.nick, trip: e.trip });
      setusers((u) => [...u, User(e.nick, e.trip)]);
    }
  };
  return <ul>{users}</ul>;
}
function Sidebar() {
  if (localStorage["init"] != "true")
    for (let _ in global_config.init_conf)
      localStorage[_] = global_config.init_conf[_];

  //受控组件
  let [selects, _setSelects] = React.useState({
    mod: localStorage["modData"] || "null",
    theme: ChangeTheme(localStorage["theme"] || "lime"),
    level: ChangeLevel(localStorage["level"] || "onlytext"),
    hlight: ChangeHlight(localStorage["hlight"] || "darcula"),
    ws_url: localStorage["ws_url"] || global_config.ws_urls[0][0],
  });

  let setSelects = (o, p) => {
    _setSelects({ ...selects, [o]: p });
    return p;
  };
  let [sidebar_ref, sidebar_ref_set] = React.useState({
    sidebar: global_config.pageMode
      ? "hidden"
      : localStorage["pin-sidebar"] == "true"
      ? "expend"
      : "",
    sidebar_content: localStorage["pin-sidebar"] == "true" ? "" : "hidden",
  });
  //侧边栏配置
  let config_checkbox = [
    [
      "设置",
      {
        "auto-login": { text: "自动登录" },
        "pin-sidebar": {
          text: "固定侧边栏",
          func: (e) => global_config.ui.updatePageWidth(),
        },
        "sound-switch": { text: "声音提醒" },
        "notify-switch": { text: "桌面通知" },
        "parse-latex": {
          text: "启用数学公式",
          func: (e) =>
            global_config.md.md.inline.ruler[e ? "enable" : "disable"]([
              "katex",
            ]) &&
            global_config.md.md.block.ruler[e ? "enable" : "disable"]([
              "katex",
            ]),
          init: (e) =>
            !e &&
            global_config.md.md.inline.ruler.disable(["katex"]) &&
            global_config.md.md.block.ruler.disable(["katex"]),
        },
        "syntax-highlight": { text: "代码高亮" },
        "send-btn": {
          text: "显示发送按钮",
          func: (e) => ($("#sendbtn").style.display = e ? "block" : "none"),
        },
      },
    ],
    [
      "更多",
      {
        "joined-left": { text: "显示 加入/离开" },
        "show-head": { text: "显示头像" },
        "allow-image": { text: "显示图片" },
      },
    ],
    [
      "实验室",
      {
        "fun-system": { text: "有趣的系统" },
        "rainbow-nick": { text: "彩虹昵称" },
        "allow-html": { text: "显示HTML信息" },
        "show-html-code": {
          text: "调试模式",
          isLazy: true,
          func: (e) =>
            (global_config.showHtmlCode = e) &&
            pushInfoEx(
              "您已开启HTML信息调试模式，右键点击HTML信息对应的昵称即可查看HTML信息源码，此模式将在下次打开网页的时候自动关闭"
            ),
        },
        "allow-audio": { text: "显示音频信息" },
      },
    ],
  ];
  //配置
  let sidebar_conf = global_config.sidebar_conf;
  //受控组件
  let [sidebar_local_ref, _sidebar_local_ref_set] =
    React.useState(sidebar_conf);
  //侧边栏固定
  let handleLeave = (e) => {
    //console.log("handleLeave");
    var j = {};
    if (e.__type && e.__type == "document") j = e.toElement || e.relatedTarget;
    else j = e.nativeEvent.toElement || e.nativeEvent.relatedTarget;
    try {
      if (j.parentNode == this || j == this) {
        return;
      }
    } catch (g) {
      return;
    }
    if (!global_config.sidebar_conf["pin-sidebar"])
      sidebar_ref_set({ sidebar: "", sidebar_content: "hidden" });
  };
  let handleOn = (e) => {
    e.stopPropagation();
    // console.log("handleOn");
    if (!global_config.sidebar_conf["pin-sidebar"])
      sidebar_ref_set({ sidebar: "expend", sidebar_content: "" });
  };

  let sidebar_content = (
    <div className={"sidebar-content " + sidebar_ref["sidebar_content"]}>
      <div className="weui-cells_checkbox">
        {config_checkbox.map((e, i) => {
          let title = [
            <hr key={i} />,
            <p key={e} className="text title">
              {e[0]}
            </p>,
          ];

          return (
            <div key={e}>
              {i >= 1 ? title : title.reverse()}
              {Object.keys(e[1]).map((v) => {
                let j = e[1][v];
                let _ = global_config.init_conf[v] || {};
                let __ =
                  (global_config.sidebar_conf[v] =
                  sidebar_conf[v] =
                    global_config.first_init
                      ? localStorage[v] == "true"
                      : _.constructor == Boolean
                      ? v
                      : _.constructor == Function
                      ? _()
                      : false);
                //一起设置，方便受控组件

                if (typeof j.init == "function")
                  global_config.onloads.push(() => j.init(__));

                let sidebar_local_ref_set = (o, p) => {
                  _sidebar_local_ref_set({ ...sidebar_local_ref, [o]: p });
                  if (j.func) j.func(p);
                };
                return (
                  <label
                    key={v}
                    className="weui-cell weui-cell_active weui-check__label"
                    htmlFor={v}
                  >
                    <div className="weui-cell__hd">
                      <input
                        type="checkbox"
                        className="weui-check"
                        id={v}
                        checked={sidebar_local_ref[v]}
                        onChange={(e) =>
                          sidebar_local_ref_set(
                            v,
                            (() => {
                              let _f_ = (global_config.sidebar_conf[v] =
                                !!e.target.checked);
                              localStorage[v] = !j.isLazy ? _f_ : false;
                              return _f_;
                            })()
                          )
                        }
                      />
                      <i className="weui-icon-checked checkbox_color"></i>
                    </div>
                    <div className="weui-cell__bd">{j.text}</div>
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>
      <hr />
      <p>
        <label>管理员操作</label>
        <select
          id="mod-action"
          value={selects["mod"]}
          onChange={
            (e) =>
              (global_config.modData = JSON.parse(
                setSelects("mod", (localStorage["modData"] = e.target.value))
              ))
            //奇技淫巧 这里为了更简便写成这样了 setSelects返回传进去的值 然后再parse
          }
        >
          {global_config.modAction.map((e) => (
            <option key={e.text} value={JSON.stringify(e.data)}>
              {e.text}
            </option>
          ))}
        </select>
      </p>
      <hr />
      <p>
        <label>主题</label>
        <br />
        <select
          id="scheme-selector"
          value={selects["theme"]}
          onChange={(e) =>
            ChangeTheme(
              setSelects("theme", (localStorage["theme"] = e.target.value))
            )
          }
        >
          {global_config.themes.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label>高光样式</label>
        <br />
        <select
          id="highlight-selector"
          value={selects["hlight"]}
          onChange={(e) =>
            ChangeHlight(
              setSelects("hlight", (localStorage["hlight"] = e.target.value))
            )
          }
        >
          {global_config.hls.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label>等级标识</label>
        <br />
        <select
          id="prefix-selector"
          value={selects["level"]}
          onChange={(e) =>
            ChangeLevel(
              setSelects("level", (localStorage["level"] = e.target.value))
            )
          }
        >
          {global_config.level.marks.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label>连接地址</label>
        <br />
        <select
          id="websocket_url"
          value={selects["ws_url"]}
          onChange={(e) =>
            setSelects("ws_url", (localStorage["ws_url"] = e.target.value)) &&
            pushInfoEx(
              "你已修改连接线路，请刷新界面来应用修改\n请注意：修改连接线路可能会造成连接不稳定，如果您不了解它，请立刻更改回去。"
            )
          }
        >
          {global_config.ws_urls.map((e) => (
            <option key={e[0]} value={e[0]}>
              {e[1]}
            </option>
          ))}
        </select>
      </p>
      <hr />
      <Button
        onClick={() => {
          createAsk(
            "日志",
            temp_log
              .map((e) => `[${e.time}] ${JSON.stringify(e.obj)}`)
              .join("\n")
          );
        }}
      >
        日志
      </Button>
      <Button onClick={global_config.ws.sethead}>设置头像</Button>
      <hr />
      <Button onClick={global_config.ui.setvideo}>设置公共视频</Button>
      <Button onClick={global_config.ui.SeeYouAgain}>一起看视频</Button>
      <hr />
      <Button onClick={global_config.ui.clearMessages}>清空聊天记录</Button>
      <hr />
      <p className="ptitle">在线用户</p>
      <p style={{ fontSize: "14px", margin: 0 }}>
        (左键单击可邀请到新房间)
        <br />
        (右键单击可执行管理员操作)
      </p>
      <Users />
    </div>
  );
  document.ontouchstart = (e) => handleLeave({ __type: "document", e });
  if (!global_config.first_init) localStorage["init"] = "true";
  return (
    <nav
      onMouseEnter={handleOn}
      onTouchStart={handleOn}
      onMouseLeave={handleLeave}
      className={"sidebar " + sidebar_ref["sidebar"]}
    >
      {sidebar_content}
    </nav>
  );
}
/* --------------------------------------------------------------- */
function getChatLevel(args) {
  /* 
     primary 0
     trust 1
     roomop 2
     mod 3
     admin 4
     bot 5
  */
  let levels = {
    isBot: "bot",
    admin: "admin",
    mod: "mod",
    channelOwner: "roomop",
    trusted: "trust",
  };
  let temp_levels = Object.keys(args);
  temp_levels = temp_levels
    .filter((e) => levels[e] != undefined && args[e] == true)
    .map((e) => levels[e]);
  if (temp_levels.includes("admin") || temp_levels.includes("mod")) {
    temp_levels = temp_levels.filter((e) => e != "trust");
  }
  return temp_levels;
}
function Bubble({
  me,
  head,
  trip,
  nick,
  level,
  rawargs,
  content,
  color,
  time,
  html,
  _react_obj,
}) {
  let ref1 = React.useRef(null),
    ref2 = React.useRef(null);
  const [bubbleClass, setbubbleClass] = React.useState(
    global_config.level.mark
  );
  let AtNick = () => {
    global_config.ui.insertAtCursor(`@${nick} `);
    $("#chatinput").focus();
  };
  let is_delmsg = false;
  let menu_conf = () => {
    return {
      menus: [
        {
          name: "引用",
          click: (e) =>
            global_config.ui.quoteMessage({
              nick,
              trip,
              text: rawargs.text,
              html,
            }),
        },
        { name: `@${nick}`, click: () => AtNick() },
        ...(() => {
          let copy_list = [
            ["识别码", "trip"],
            ["呢称", "nick"],
            ["颜色", "color", (e) => "#" + e],
            ["时间", "time", (e) => formattedDate(e)],
          ];
          return copy_list
            .filter((e) => rawargs[e[1]] != undefined)
            .map((e) => {
              return {
                name: `复制${e[0]}${
                  rawargs[e[1]]
                    ? ` (${e[2] ? e[2](rawargs[e[1]]) : rawargs[e[1]]})`
                    : ""
                }`,
                click: () => copyToClip(rawargs[e[1]]),
              };
            });
        })(),
        {
          name: "管理员操作",
          click: (e) =>
            showMenuEx({
              x: e.x,
              y: e.y,
              obj: {
                menus: global_config.modAction.map((j) => {
                  return {
                    name: j.text,
                    click: (e) => global_config.ui.userModAction(nick, j.data),
                  };
                }),
              },
            }),
        },
        getMin(time) < 60 * 2 && !is_delmsg
          ? {
              name: "撤回",
              click: (e) =>
                (is_delmsg = true) && global_config.ws.send({ cmd: "delmsg" }),
            }
          : null,
      ],
    };
  };
  let _showMenu = (e, j) => {
    //兼容 这里就抛弃j变量了 防止click的时候无法移除菜单
    menu = ContextMenu(menu_conf());
    showMenu(e, menu);
  };
  let menu = ContextMenu(menu_conf());
  let menuEvent = (e) =>
    !isMobile() ? _showMenu(e.nativeEvent, menu) : fuckDefaultMenu(e);

  React.useEffect(() => {
    global_config.level.arr.push({ setbubbleClass, bubbleClass });
    if (isMobile()) {
      longPress(ref1.current, (e) => _showMenu(e, menu));
      longPress(ref2.current, (e) => _showMenu(e, menu));
    }
  }, []);
  document.addEventListener("click", (e) => hideMenu(menu));
  return (
    <div className={me ? "chat-receiver" : "chat-sender"}>
      <div ref={ref1} className="img" onContextMenu={menuEvent}>
        <img
          className="head unselectable"
          src={head.isUse ? head.url : "css/img/head.png"}
        />
      </div>
      <div className="handle">
        <div
          className="blocks unselectable"
          ref={ref2}
          onContextMenu={menuEvent}
        >
          <span className="baseblock">
            {trip ? <span className="trip">{trip}</span> : null}
            <span className="mynick">
              <a
                style={{
                  color: /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(color)
                    ? color
                    : "#ffffff",
                }}
                title={formattedDate(time)}
                onClick={AtNick}
              >
                {nick}
              </a>
            </span>
          </span>
          <span className={bubbleClass}>{level}</span>
        </div>
        <div
          className={!html ? "bubble" : "bubble_html"}
          dangerouslySetInnerHTML={
            _react_obj == true
              ? undefined
              : {
                  __html: content,
                }
          }
        >
          {_react_obj == true ? content : undefined}
        </div>
      </div>
    </div>
  );
}
function BubbleBuilder(e) {
  const {
    me = false,
    nick,
    trip,
    head,
    text,
    args,
    html,
    _react_obj,
    id,
    color,
    time,
  } = e;
  console.log("bubbleBuild args:", e);
  return (
    <Bubble
      id={id}
      key={getUuid()}
      content={html ? text : global_config.md.md.render(text)}
      me={me}
      nick={nick}
      trip={trip}
      level={getChatLevel(args).map((e) => (
        <span key={getUuid()} className={"block " + e}></span>
      ))}
      color={color}
      rawargs={e}
      head={{
        isUse:
          global_config.sidebar_conf["show-head"] &&
          head != undefined &&
          head != "imgs/head.png",
        url: head,
      }}
      html={html}
      time={time}
      _react_obj={_react_obj}
    />
  );
}
function BubbleBuilderEx(args, html = false) {
  return BubbleBuilder({
    me: args.nick == global_config.ws.nick,
    nick: args.nick,
    trip: args.trip,
    head: args.head || undefined,
    text: args.text,
    args,
    id: args.id,
    color: args.color,
    html,
    time: args.time,
    _react_obj: args._react_obj == true,
  });
}
/*********************************************/
function Widget({ text, type, nick, time, html = false }) {
  let ref = React.useRef(null);
  let menu = ContextMenu({
    menus: [
      time ? { name: `${formattedDate(time)}` } : undefined,
      {
        name: "引用",
        click: (e) => global_config.ui.quoteMessage({ nick, text }),
      },
      { name: "复制", click: (e) => copyToClip(text) },
      (() => {
        if (nick != "*" && nick != "!")
          return {
            name: "复制呢称",
            click: (e) => copyToClip(nick),
          };
      })(),
    ],
  });
  React.useEffect(() => {
    if (isMobile()) longPress(ref.current, (e) => showMenu(e, menu));
  }, []);
  console.log(
    "notice_back_color content " +
      (global_config.isMobile ? "none_point " : " ") +
      type
  );
  let menuEvent = (e) =>
    !isMobile() ? showMenu(e.nativeEvent, menu) : fuckDefaultMenu(e);
  document.addEventListener("click", (e) => hideMenu(menu));
  return (
    <div className="chat-notice" onContextMenu={menuEvent} ref={ref}>
      <span
        className={
          "notice_back_color content " +
          (global_config.isMobile ? "unselectable " : " ") +
          type
        }
        dangerouslySetInnerHTML={{
          __html: !html ? global_config.md.md.render(text) : text,
        }}
      />
    </div>
  );
}
function pushWidget({ text, type = "info", nick = "*", time }) {
  global_config.atBottom = global_config.ui.isAtBottom();
  global_config.pushMessage(
    <Widget
      key={getUuid()}
      type={type}
      nick={nick}
      text={text}
      time={time || Date.now()}
    />
  );
}
const pushInfo = ({ text, time, nick = "*" }) =>
  pushWidget({ text, type: "info", nick, time });
const pushWarn = ({ text, time, nick = "*" }) =>
  pushWidget({ text, type: "warn", nick, time });
var pushInfoEx = (e) => pushInfo({ text: e }),
  pushWarnEx = (e) => pushWarn({ text: e });
function pushWelcomeButton(text) {
  global_config.atBottom2 = global_config.ui.isAtBottom();
  global_config.pushMessage(
    <div key={getUuid()} className="center">
      <Button
        onClick={() =>
          global_config.ws.chat(
            [
              "hi y" + "o".repeat(Math.round(Math.random() * 20)),
              "uwu!",
              "awa!",
              "来了老弟~",
            ][Math.round(Math.random() * 3)]
          )
        }
      >
        {text}
      </Button>
    </div>
  );
}
/*********************************************/
function buildReplyText(user, text) {
  var replyText = `>`;
  var tooLong = true;
  const textList = text.split("\n");

  if (user.trip) {
    replyText += `[${user.trip}] ${user.nick}：\n`;
  } else {
    replyText += `${user.nick}：\n`;
  }

  for (var i = 0; i < 8; i += 1) {
    if (typeof textList[i] === "undefined") {
      tooLong = false;
      break;
    }

    replyText += `>${textList[i]}\n`;
  }

  if (i < textList.length && tooLong) {
    replyText += ">……\n\n";
  } else {
    replyText += "\n";
  }

  if (user.nick !== global_config.ws.nick) {
    replyText += `@${user.nick} `;
  }

  return replyText;
}
function ChatSend(e) {
  if (!global_config.ws.isConnect) global_config.ws.join();
  if (!!e.target.value) {
    var text = e.target.value;
    e.target.value = "";
    global_config.ws.chat(text);

    global_config.lastSent[0] = text;
    global_config.lastSent.unshift("");
    global_config.lastSentPos = 0;

    global_config.ui.updateInputSize();
  }
}
function Chat() {
  let [messages, push_message] = React.useState([]);
  React.useLayoutEffect(() => {
    console.log(global_config.atBottom, global_config.atBottom2);
    if (global_config.atBottom || global_config.atBottom2) {
      window.scrollTo(0, document.body.scrollHeight);
      global_config.atBottom = global_config.atBottom2 = false;
    }
  }, [messages]);
  global_config.doMessage = (e) => {
    global_config.atBottom2 = global_config.ui.isAtBottom();
    push_message((j) => [...e(j)]);
  };
  global_config.pushMessage = (e) => {
    global_config.atBottom = global_config.ui.isAtBottom();
    push_message((messages) => [...messages, e]);
  };

  function handleInput(j) {
    let e = j.nativeEvent;
    if (e.keyCode == 13 /* ENTER */ && !e.shiftKey) {
      e.preventDefault();
      // 发送消息
      ChatSend(e);
    } else if (e.keyCode == 38 /* UP */) {
      // 恢复以前发送的消息
      if (
        e.target.selectionStart === 0 &&
        global_config.lastSentPos < global_config.lastSent.length - 1
      ) {
        e.preventDefault();

        if (global_config.lastSentPos == 0) {
          global_config.lastSent[0] = e.target.value;
        }

        global_config.lastSentPos += 1;
        e.target.value = global_config.lastSent[global_config.lastSentPos];
        e.target.selectionStart = e.target.selectionEnd = e.target.value.length;

        global_config.ui.updateInputSize();
      }
    } else if (e.keyCode == 40 /* DOWN */) {
      if (
        e.target.selectionStart === e.target.value.length &&
        global_config.lastSentPos > 0
      ) {
        e.preventDefault();

        global_config.lastSentPos -= 1;
        e.target.value = global_config.lastSent[global_config.lastSentPos];
        e.target.selectionStart = e.target.selectionEnd = 0;

        global_config.ui.updateInputSize();
      }
    } else if (e.keyCode == 27 /* ESC */) {
      // 清空输入框
      e.preventDefault();
      e.target.value = "";
      global_config.lastSentPos = 0;
      global_config.lastSent[global_config.lastSentPos] = "";
      global_config.ui.updateInputSize();
    } else if (e.keyCode == 9 /* TAB */) {
      if (e.ctrlKey) {
        return;
      }

      e.preventDefault();

      var pos = e.target.selectionStart || 0;
      var text = e.target.value;
      var index = text.lastIndexOf("@", pos);

      var autocompletedNick = false;

      if (index >= 0) {
        var stub = text.substring(index + 1, pos);

        // 搜索昵称
        var nicks = global_config.users.onlineusers.filter(
          (g) => g.nick.indexOf(stub) == 0
        );

        if (nicks.length > 0) {
          autocompletedNick = true;

          if (nicks.length == 1) {
            global_config.ui.insertAtCursor(nicks[0].substr(stub.length) + " ");
          }
        }
      }

      // 由于没有插入昵称，因此插入一个制表符
      if (!autocompletedNick) {
        global_config.ui.insertAtCursor("\t");
      }
    }
    global_config.ui.updateInputSize();
    $("#text_count").innerText = $("#chatinput").value.length;
  }
  return (
    <>
      <article id="main_container" className="container">
        <div className="cmessages">{messages}</div>
      </article>
      <footer
        id="footer"
        style={global_config.pageMode ? { display: "none" } : null}
      >
        <div className="container">
          <div className="chatflexinput">
            <div className="weui-cells chatinput">
              <div className="weui-cell">
                <div className="weui-cell__bd">
                  <textarea
                    className="weui-textarea"
                    placeholder="输入文本"
                    rows="3"
                    id="chatinput"
                    style={{ height: "24px" }}
                    onKeyDown={handleInput}
                    onInput={(e) => {
                      $("#text_count").innerText = e.target.value.length;
                      handleInput(e);
                    }}
                  ></textarea>
                  <div
                    role="option"
                    aria-live="polite"
                    className="weui-textarea-counter text_count"
                  >
                    <span id="text_count">0</span>/7000
                  </div>
                </div>
              </div>
            </div>
            <button
              className="weui-btn weui-btn_mini weui-wa-hotarea sendbtn"
              style={{
                display: localStorage["send-btn"] == "true" ? "block" : "none",
              }}
              onClick={() => ChatSend({ target: $("#chatinput") })}
              id="sendbtn"
            >
              发送
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
function App() {
  React.useLayoutEffect(() => {
    if (!loaded) {
      loaded = true;
      global_config.md.init();
      if (global_config.pageMode) return global_config.ui.initIndexPage();
      global_config.ui.updatePageWidth();
      global_config.ui.updateInputSize();
      window.onfocus = () => {
        global_config.windowActive = true;
        global_config.ui.updateTitle();
      };

      window.onblur = () => {
        global_config.windowActive = false;
      };

      window.onscroll = () => {
        if (global_config.ui.isAtBottom()) {
          global_config.ui.updateTitle();
        }
      };
      window.onresize = () =>
        !fuckALLMenu() && global_config.ui.updatePageWidth();
      global_config.onloads.forEach((e) => e());

      global_config.ws.join();
      console.log("isMobile", isMobile());
    }
  }, []);
  return (
    <>
      <Chat />
      <Sidebar />
    </>
  );
}

export default App;
