<template>
  <div class="container p-0 m-0">
    <div class="container" v-if="!choice1 && !choice2">
      <h1 class="text-center">Merci pour vos votes !</h1>
      <h1>Classement</h1>
      <p v-for="item in leaderboard" :key="item">
        {{ item.title }} - {{ item.count }} votes
      </p>
    </div>

    <div class="d-flex flex-wrap p-3 gap-3" v-if="choice1 && choice2">
      <img
        :src="choice1.first_choice_image_url"
        alt="Choice 1"
        class="col"
        v-if="choice1"
        @click="onSubmit(choice1, choice1?.first_choice_title)"
      />
      <img
        :src="choice2?.second_choice_image_url"
        alt="Choice 2"
        class="col"
        v-if="choice2"
        @click="onSubmit(choice1, choice2?.second_choice_title)"
      />
      <div
        class="position-absolute rounded-circle bg-white d-flex justify-content-center align-items-center m-auto border border-primary border-5"
      >
        <h1 class="text-primary mb-0">?</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.css";

export default {
  computed: {
    async choiceByUserComputed() {
      return this.choiceByUser;
    },
  },
  data() {
    return {
      choiceByUser: [],
      choice1: {
        first_choice_title: "",
        first_choice_image_url: "",
      },
      choice2: {
        second_choice_title: "",
        second_choice_image_url: "",
      },
      choices: [
        {
          first_choice_title: "",
          first_choice_image_url: "",
          second_choice_title: "",
          second_choice_image_url: "",
        },
      ],
      leaderboard: {},
      selectedChoice: "",
      index: 0,
      progressBarWidth: 25,
    };
  },
  methods: {
    getNextChoice() {
      this.choice1 = this.choices[this.index];
      this.choice2 = this.choices[this.index];
      this.index++;
    },

    getChoices() {
      axios
        .get(`${import.meta.env.VITE_BACK_API}/choices`)
        .then((response) => {
          this.choices = response.data;
          this.getNextChoice();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getLeaderboard() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACK_API}/votes/leaderboard`
        );

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    updateChoiceVote(choice, selectedChoice) {
      choice.votes = choice.votes + 1;
      const id = choice._id;
      choice.selectedChoice = selectedChoice;
      axios.put(`${import.meta.env.VITE_BACK_API}/choices/${id}`, choice, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress",
        },
      });
    },

    setChoiceByUser(choice) {
      this.choiceByUser.push(choice);
    },

    increaseValueProgressBar() {
      if (this.index / this.choices.length < 0.25) {
        this.progressBarWidth = 25;
      } else if (this.index / this.choices.length < 0.5) {
        this.progressBarWidth = 50;
      } else if (this.index / this.choices.length < 0.75) {
        this.progressBarWidth = 75;
      } else if (this.index / this.choices.length == 1) {
        this.progressBarWidth = 100;
      }
    },
    onSubmit(choice, title) {
      this.setChoiceByUser(title);
      this.selectedChoice = title;
      this.increaseValueProgressBar();
      this.getNextChoice();
      this.updateChoiceVote(choice, title);
    },
  },
  async created() {
    this.getChoices();
    this.leaderboard = await this.getLeaderboard();
  },
};
</script>
