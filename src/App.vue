<template>
  <div id="app" class="container">
    <div class="description">
      Please select a file to upload or paste the content.
    </div>
    <textarea v-model="textContent" class="textarea" placeholder="Paste your content here"></textarea>
    <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload"/>
    <div v-if="linkAddress" class="link-address">
      <div class="link-address-text">
        {{ linkAddress }}
      </div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3Vx_iNdQ0h1PVB3xS1vomz-nOlbBkJFtx9nQ351QiZHwc3APEU8C7CENvfKQLYAmBr4&usqp=CAU" alt="copy" class="copy-icon" @click="copyLink">
    </div>
    <button v-else @click="triggerFileUpload" class="upload-button">
      <div v-if="loading" class="ldrs-tail-chase">
        <l-tail-chase size="20" speed="1.75" color="white"></l-tail-chase>
      </div>
      <div v-else>
        File Select / Commit
      </div>
    </button>
    <!-- 添加 Toast 组件 -->
    <div v-if="showToast" class="toast">
      {{ toastMessage }}
    </div>
  </div>
</template>


<script>
import { tailChase } from 'ldrs'

tailChase.register()

export default {
  name: 'App',
  data() {
    return {
      loading: false,
      textContent: '', 
      linkAddress: '', // 上传成功后的链接地址
      showToast: false,
      toastMessage: '',
    };
  },
  methods: {
    triggerFileUpload() {
      if (this.textContent) {
        // 如果 textarea 有内容，则上传文本内容
        this.uploadTextContent();
      } else {
        // 如果 textarea 为空，弹出文件选择框
        this.$refs.fileInput.click();
      }
    },
    async uploadTextContent() {
      this.loading = true;
      try {
        // 使用 FormData 包装上传的文本
        const formData = new FormData();
        formData.append('content', this.textContent);

        // 使用 fetch 发送 POST 请求到 pastebin 服务
        const response = await fetch('/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ content: this.textContent })
        });

        const text = await response.text();
        this.showToastMessage('上传成功');
        this.linkAddress = this.extractLink(text); // 提取链接
      } catch (error) {
        console.error('Error uploading text content:', error);
      } finally {
        this.loading = false;
      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.loading = true;
        try {
          const formData = new FormData();
          formData.append('file', file);

          // 使用 fetch 上传文件
          const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
          });

          const text = await response.text();
          this.linkAddress = this.extractLink(text);
          this.showToastMessage('上传成功');
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          this.loading = false;
        }
      }
    },
    extractLink(htmlContent) {
      // 使用正则表达式提取 href 中的链接
      const linkMatch = htmlContent.match(/<a href="([^"]+)" target="_parent">/);
      return linkMatch ? linkMatch[1] : ''; // 如果匹配到链接则返回，否则返回空字符串
    },
    showToastMessage(message, duration = 2000) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, duration);
    },
    copyLink() {
      navigator.clipboard.writeText(this.linkAddress)
        .then(() => {
          this.showToastMessage('复制成功');
        })
        .catch(err => {
          console.error('复制失败:', err);
          this.showToastMessage('复制失败，请手动复制');
        });
    }
  },
}

</script>

<style scoped>  
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.description {
  width: 300px;
  font-size: 25px;
  text-align: center;
  color: #666;
}

.upload-button {
  margin-top: 25px;
  width: 200px;
  height: 50px;
  padding: 15px 10px;
  font-size: 16px;
  text-align: center;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
}

.copy-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.link-address {
  margin-top: 25px;
  font-size: 16px;
  color: #666;

  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
}

.textarea {
  margin-top: 50px;
  width: 300px;
  height: 100px;
  border-radius: 5px;
  min-height: 100px;
  min-width: 300px;
}

.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
}
</style>
