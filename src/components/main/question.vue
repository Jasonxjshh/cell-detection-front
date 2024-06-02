<template>

  <div id="quiz">

<!--    <div class="background"></div>-->
    <!-- 查看答题卡按钮，放在容器的顶部 -->
    <button class="view-answer-sheet" @click="toggleAnswerSheet">查看答题卡</button>
    <!-- 显示题目编号 -->
    <h2>题目编号: {{ currentQuestion.id }}</h2>
    <div class="demo-image__placeholder">
      <div class="block">
<!--        <span class="demonstration">自定义</span>-->
        <el-image :src="'http://localhost:8080'+currentQuestion.imageUrl">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </div>


    <!-- 答题卡浮窗 -->
    <div class="answer-sheet" v-if="showAnswerSheet">
      <div v-for="n in paginatedQuestions" :key="n" class="sheet-button-wrapper">
        <button  @click="goToQuestion(n)" class="sheet-button">
        {{ n }}
        </button>
      </div>
      <div class="pagination-controls">
        <button @click="previousPage" :disabled="currentPage === 1" v-if="currentPage > 1">上一页</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" v-if="currentPage < totalPages">下一页</button>
      </div>
    </div>

    <div class="interaction-area">
      <input v-model="userAnswer" placeholder="输入答案">
      <div class="navigation-buttons">
        <button @click="getPrevious" v-if="hasPrevious">上一题</button>
        <button @click="getNext" v-if="hasNext">下一题</button>
      </div>
    </div>
    <button class="sub" @click="submitAnswer">提交</button>
    <div v-if="showCorrectAnswer" class="correct-answer-display">{{ correctAnswerText }}</div>  <!-- 显示正确答案 -->
    <div class="response-area" v-if="response">
      <p class="response-area" >{{ response }}</p>
      <button @click="showAnswer">查看答案</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        currentQuestion: {
          id:1,
          imageUrl:'/单核细胞.png',
          answer:'单核细胞'
        },
        currentIndex: 0,  // 当前题目的索引，初始化为0
        answers:{}, //存储每道题的答案
        showAnswerSheet: false, // 控制答题卡浮窗的显示
        showCorrectAnswer:false,
        correctAnswerText:'',
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的题目数
        questions: [], // 所有题目编号
        totalQuestions: 0, // 总题目数
        userAnswer: '',
        response: null,
        hasPrevious: false,
        hasNext: true,
      };
    },
    methods: {
      getCurrentQuestionById(id) {
        axios.get(`http://localhost:8080/questions/getQuestionById?id=${id}`)
          .then(res => {
            this.currentQuestion = res.data;
            this.userAnswer = this.answers[this.currentQuestion.id] || '';
            this.currentIndex = this.questions.findIndex(q => q === id);  // 更新当前索引
            console.log("currentIndex"+this.currentIndex);
            this.response = null;
            this.showCorrectAnswer = false;  // 切换题目时隐藏答案
            // Update navigation buttons
            this.updateNavigation(this.currentQuestion.id);
          });
      },
      getCurrentQuestion() {
        axios.get("/questions/current")
          .then(res => {
            this.currentQuestion = res.data;
            this.userAnswer = this.answers[this.currentQuestion.id] || '';
            this.response = null;
            this.showCorrectAnswer = false;  // 切换题目时隐藏答案
            // Update navigation buttons
            this.updateNavigation(this.currentQuestion.id);
          });
      },
      submitAnswer() {
        const data1 = {
          answer: this.userAnswer,
          id: this.currentIndex + 1 // 包含题目ID
        };
        axios.post('http://localhost:8080/questions/checkAnswer', data1, {
          headers:{
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            this.response = res.data;
            this.answers[this.currentQuestion.id] = this.userAnswer;  // 存储当前题目的答案
          });
      },
      showAnswer() {
        this.correctAnswerText = "正确答案: " + this.currentQuestion.answer;
        // alert("正确答案是: " + this.currentQuestion.answer);
        this.showCorrectAnswer = true;  // 切换题目时隐藏答案
      },

      getNext() {
        // axios.get('/questions/next')
        //   .then(res => {
        //     this.currentQuestion = res.data;
        //     this.userAnswer = this.answers[this.currentQuestion.id] || '';  // 使用存储的答案或默认为空
        //     this.updateNavigation(this.currentQuestion.id);
        //   });
        console.log("::"+this.currentIndex);
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
          console.log(":::::::"+this.currentIndex);
          this.getCurrentQuestionById(this.questions[this.currentIndex]);
          console.log(":::::::--------"+this.questions[this.currentIndex]);

        }
        this.resetResponseAndAnswer();
      },
      getPrevious() {
        // axios.get('/questions/previous')
        //   .then(res => {
        //     this.currentQuestion = res.data;
        //     this.userAnswer = this.answers[this.currentQuestion.id] || '';  // 使用存储的答案或默认为空
        //     this.updateNavigation(this.currentQuestion.id);
        //   });
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.getCurrentQuestionById(this.questions[this.currentIndex]);
          // this.updateNavigation(this.currentIndex);
        }
      },
      toggleAnswerSheet() {
        this.showAnswerSheet = !this.showAnswerSheet;
      },
      goToQuestion(questionId) {
        this.getCurrentQuestionById(questionId);
        this.showAnswerSheet = false; // 关闭答题卡视图
      },
      updateNavigation(currentId) {
        this.hasPrevious = currentId > 1;
        this.hasNext = currentId < this.totalQuestions;
      },
      resetResponseAndAnswer(){
        this.response = null;
      },
      // 切换到下一页
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      // 切换到上一页
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      // 加载所有题目编号
      fetchTotalQuestionsCount() {
        console.log("shiduidema")
        axios.get('http://localhost:8080/questions/count')
          .then(response => {
            this.totalQuestions = response.data;
            this.questions = Array.from({ length: this.totalQuestions }, (_, i) => i + 1);
            console.log("questions"+this.questions[0]+" "+this.questions[1]+" "+this.questions[2]);
            this.currentIndex = this.questions.indexOf(this.currentQuestion.id);
            console.log(this.totalQuestions);
          })
          .catch(error => {
            console.error('Error fetching total questions count:', error);
          });
      }
    },
    computed: {
      // 计算总页数
      totalPages() {
        return Math.ceil(this.totalQuestions / this.pageSize);
      },
      // 获取当前页的题目编号
      paginatedQuestions() {
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = start + this.pageSize;
        console.log(end);
        return Array.from({ length: Math.min(this.pageSize, this.totalQuestions - start + 1) }, (_, i) => start + i);
      }
    },
    mounted() {
      // this.getCurrentQuestion();
      this.fetchTotalQuestionsCount();
      // this.getCurrentQuestionById(this.id);

    }
  };
</script>

<style scoped>
  #quiz {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f9f9f9;
    background: url('../../assets/background1.jpg')center top / cover no-repeat;
  }

  h2 {
    color: #333;
    font-size: 20px;
    margin-top: 10px;
  }

  .view-answer-sheet {
    position: absolute;
    top: 10px; /* 与顶部的距离 */
    right: 10px; /* 与右侧的距离 */
    padding: 5px 10px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .view-answer-sheet:hover {
    background-color: #337ecc;
  }


  .sheet-button {
    display: flex;            /* 启用flexbox */
    align-items: center;      /* 垂直居中 */
    justify-content: center;  /* 水平居中 */
    width: 40px;
    height: 40px;
    border-radius: 50%;       /* 使按钮呈圆形 */
    background-color: #409EFF;/* 按钮背景颜色 */
    color: white;             /* 文字颜色 */
    font-size: 16px;          /* 文字大小，可根据需要调整 */
    cursor: pointer;
    border: 1px solid transparent; /* 边框颜色，如果不需要可设置为透明 */
    transition: background-color 0.3s, transform 0.3s; /* 过渡效果 */
  }


  .sheet-button:hover {
    background-color: #337ecc; /* 鼠标悬停时的背景颜色 */
    transform: scale(1.1); /* 鼠标悬停时放大 */
  }

  .sheet-button:focus {
    outline: none; /* 点击时去掉焦点轮廓 */
  }
  .sheet-button-wrapper {
    display: inline-flex; /* 保持按钮水平排列 */
    width: 20%; /* 五列布局 */
  }
  .pagination-controls {
    text-align: center;
    padding-top: 10px;
  }

  .answer-sheet {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    width: 320px;
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 1000;  /* 确保浮窗在最上层 */
  }

  .demo-image__placeholder .block {
    margin-top: 20px;
    text-align: center;
  }

  .el-image {
    /*max-width: 300px; !* 控制图片最大宽度 *!*/
    /*height: auto; !* 保持图片的纵横比 *!*/
    width: 300px; /* 固定图片宽度为300px */
    height: 170px; /* 固定图片高度为200px */
    object-fit: cover; /* 确保图片内容按比例填充容器，多余的部分会被裁剪 */
    border-radius: 10px; /* 为图片添加圆角 */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 添加阴影 */
  }

  .input-group { /* 新增样式 */
    position: relative; /* 相对定位基础 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .response-area p {
    color: #333;
    background-color: #e8f4fc; /* 浅蓝色背景 */
    border: 1px solid #409eff; /* 蓝色边框 */
    padding: 10px 15px;
    border-radius: 10px; /* 圆角 */
    font-size: 16px; /* 字体大小 */
    font-weight: bold; /* 字体加粗 */
    margin: 10px 0; /* 上下边距 */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 添加阴影 */
    text-align: center; /* 文字居中 */
  }

  .correct-answer-display {
    color: white;
    background-color: #32a852; /* 绿色背景表示正确 */
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
    box-shadow: 0px 4px 8px rgba(46, 204, 113,0.3); /* 绿色阴影 */
    text-align: center;
  }

  input {
    padding: 10px 15px;
    margin-right: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 300px; /* 设置输入框宽度 */
  }

  /*.button-group { !* 按钮组的定位 *!*/
  /*  position: absolute; !* 绝对定位 *!*/
  /*  left: 100%; !* 置于输入框右侧 *!*/
  /*  top: 0; !* 与输入框顶部对齐 *!*/
  /*  white-space: nowrap; !* 防止按钮换行 *!*/
  /*  margin-left: 20px; !* 与输入框的间隔 *!*/
  /*}*/
  /*button {*/
  /*  padding: 10px 20px;*/
  /*  background-color: #409eff;*/
  /*  border: none;*/
  /*  color: white;*/
  /*  border-radius: 5px;*/
  /*  cursor: pointer;*/
  /*  margin: 10px;*/
  /*  transition: background-color 0.3s;*/
  /*}*/
  /*.input-wrapper {*/
  /*  width: 100%;*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  align-items: center;*/
  /*}*/

  /*.input-group {*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  position: relative;*/
  /*}*/

  /*.input-group input {*/
  /*  padding: 10px 15px;*/
  /*  border: 2px solid #ccc;*/
  /*  border-radius: 5px;*/
  /*  font-size: 16px;*/
  /*  width: 300px;*/
  /*}*/

  /*.button-group {*/
  /*  display: flex;*/
  /*  position: absolute;*/
  /*  left: 100%;*/
  /*  top: 0;*/
  /*  margin-left: 20px;*/
  /*  align-items: center; !* 确保按钮和文本垂直居中 *!*/
  /*}*/


  /*.navigation-buttons { !* 新增的按钮组样式 *!*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  margin-top: 20px;*/
  /*}*/
  .sub {
    padding: 10px 20px;
    background-color: #409eff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px; /* 增加顶部边距以向下移动按钮 */
  }

  .sub:hover {
    background-color: #337ecc;
  }

  .sub:active {
    background-color: #1a73e8;
  }

  button {
    padding: 10px 20px;
    background-color: #409eff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px; /* 调整按钮之间的间隔 */
  }

  /*button:hover {*/
  /*  background-color: #337ecc;*/
  /*}*/

  .interaction-area {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .interaction-area input {
    padding: 10px 15px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 300px;
  }

  .navigation-buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: calc(100% + 10px);
  }

  .navigation-buttons button {
    padding: 10px 20px;
    background-color: #409eff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
  }

  button:hover {
    background-color: #337ecc;
  }

  button:active {
    background-color: #1a73e8;
  }

  .response-area {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  .response-area p {
    margin-right: 10px;
    color: #333;
    font-size: 16px;
  }
  p {
    margin-top: 10px;
    color: #333;
    font-size: 16px;
  }

  .image-slot {
    color: #fff;
    font-size: 18px;
    background-color: rgba(0,0,0,0.5);
    padding: 10px;
    border-radius: 5px;
  }
</style>
