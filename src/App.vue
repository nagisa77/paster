<template>
  <div id="app" class="container" @dragover.prevent @drop.prevent="handleDrop">
    <div class="description">
      Please select a file to upload or paste the content.
    </div>
    <textarea v-model="textContent" class="textarea" placeholder="Paste your content here"></textarea>
    <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload" />
    <div v-if="linkAddress" class="link-address">
      <div class="link-address-text">
        <a :href="linkAddress" target="_blank">{{ linkAddress }}</a>
      </div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3Vx_iNdQ0h1PVB3xS1vomz-nOlbBkJFtx9nQ351QiZHwc3APEU8C7CENvfKQLYAmBr4&usqp=CAU"
        alt="copy" class="copy-icon" @click="copyLink">
    </div>
    <button v-else @click="triggerFileUpload" class="upload-button">
      <div v-if="loading" class="ldrs-tail-chase">
        <l-tail-chase size="20" speed="1.75" color="white"></l-tail-chase>
      </div>
      <div v-else>
        File Select / Commit
      </div>
    </button>

    <div class="footer">
      If you can not upload, please allow cors demo <a href="https://cors-anywhere.herokuapp.com/corsdemo">here</a>, and click "Request temporary access to the demo server"
    </div>
  </div>
</template>

<script>
import { tailChase } from 'ldrs'
import { ElMessage } from 'element-plus'

tailChase.register()

export default {
  name: 'App',
  data() {
    return {
      loading: false,
      textContent: '',
      linkAddress: '', // 上传成功后的链接地址
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
        const response = await fetch('https://proxytopastecnet-6pc53bwxka-uc.a.run.app', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: this.textContent
        });

        const text = await response.text();
        if (text === '') {
          ElMessage.error('Upload failed, please refer to the link below');
        } else {
          ElMessage.success('Upload successful'); 
          console.log(text);
          this.linkAddress = this.extractLink(text); 
        }
      } catch (error) {
        console.error('Error uploading text content:', error);
        ElMessage.error('Upload failed'); 
      } finally {
        this.loading = false;
      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadFile(file);
      }
    },
    async uploadFile(file) {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('file', file);

        // 使用 fetch 上传文件
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://paste.c-net.org/', {
          method: 'POST',
          body: formData,
        });

        const text = await response.text();
        this.linkAddress = this.extractLink(text);
        ElMessage.success('Upload successful');
      } catch (error) {
        console.error('Error uploading file:', error);
        ElMessage.error('Upload failed');
      } finally {
        this.loading = false;
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.uploadFile(file);
      }
    },
    extractLink(htmlContent) {
      // 使用正则表达式提取 href 中的链接
      const linkMatch = htmlContent.match(/<a href="([^"]+)" target="_parent">/);
      if (linkMatch) {
        return linkMatch[1].replace('https://paste.c-net.org', 'https://chenjiating.com/p');
      } else {
        return htmlContent.replace('https://paste.c-net.org', 'https://chenjiating.com/p');
      }
    },
    copyLink() {
      // 创建一个临时的textarea元素
      const textarea = document.createElement('textarea');
      textarea.value = this.linkAddress;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999); // 对移动端的支持

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          ElMessage.success('Copy successful');
        } else {
          throw new Error('Copy command was unsuccessful');
        }
      } catch (err) {
        console.error('Copy failed:', err);
        ElMessage.error('Copy failed, please copy manually');
      }

      // 移除临时的textarea元素
      document.body.removeChild(textarea);
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

.footer {
  margin-top: 25px;
  font-size: 16px;
  width: 300px;
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
</style>
