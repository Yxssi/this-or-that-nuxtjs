<template>
  <div>
    <h1>This or That</h1>
    <div class="choice-container">
      <img
        :src="choice1.image"
        alt="Choice 1"
        class="choice-image"
        @click="setChoiceByUser(choice1)"
      />
      <h2>{{ choice1.text }}</h2>
    </div>
    <div class="choice-container">
      <img
        :src="choice2.image"
        alt="Choice 2"
        class="choice-image"
        @click="setChoiceByUser(choice2)"
      />
      <h2>{{ choice2.text }}</h2>
    </div>
    <button @click="getRandomChoices">Get New Choices</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choiceByUser: [],
      choice1: {
        text: "",
        image: "",
      },
      choice2: {
        text: "",
        image: "",
      },
      choices: [
        {
          text: "Pizza",
          image: "https://picsum.photos/300/300",
        },
        {
          text: "Hamburger",
          image: "https://loremflickr.com/300/300",
        },
        {
          text: "Salad",
          image: "https://picsum.photos/300/300",
        },
        {
          text: "Ice Cream",
          image: "https://loremflickr.com/300/300",
        },
      ],
    };
  },
  methods: {
    getRandomChoices() {
      const randomIndex1 = Math.floor(Math.random() * this.choices.length);
      const randomIndex2 = Math.floor(Math.random() * this.choices.length);

      this.choice1 = this.choices[randomIndex1];
      this.choice2 = this.choices[randomIndex2];
      console.log(this.choice1, this.choice2);
    },
    setChoiceByUser(choice) {
      this.choiceByUser.push(choice);
      console.table(this.choiceByUser);
    },
  },
  created() {
    this.getRandomChoices();
  },
};
</script>

<style>
.choice-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.choice-image {
  width: 300px;
  height: 300px;
}
</style>
