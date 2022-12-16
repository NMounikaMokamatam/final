<script setup>
import session, { fetchUsers, addNewComment, getUserComments, fetchUserExcercises } from "../stores/session";
import { onMounted, ref } from 'vue'

let inputComment = ref(false)
let commentText = ref("")
let allUsers = ref([])
let currentSelectedUser = ref({})
let currentSelectedUserComments = ref([])
let currentSelectedUserExcercises = ref([])
let currentSelectedUserStringInfo = ref("")

onMounted(async () => {
  const fetchedUsers = await fetchUsers().then(users => users)
  allUsers.value = fetchedUsers.filter(user => !user.isAdmin)
  console.log(allUsers.value)

  currentSelectedUser.value = fetchedUsers[0]
  currentSelectedUserStringInfo.value = currentSelectedUser.value.firstName + " " + currentSelectedUser.value.lastName
  currentSelectedUserComments.value = await getUserComments(currentSelectedUser.value._id).then(comments => comments)
  currentSelectedUserExcercises.value = await fetchUserExcercises(currentSelectedUser.value._id).then(excercises => excercises)

})

const showCommentBox = async(user) => {
  inputComment.value = true;
  currentSelectedUserStringInfo.value = user.firstName + " " + user.lastName
  currentSelectedUser.value = user
  currentSelectedUserComments.value = await getUserComments(user._id).then(comments => comments)
}

const addComment = () => {
  addNewComment(currentSelectedUser.value._id, commentText.value, session.user.username)
  commentText.value = ""
  inputComment.value = false
}

const getComments = async (user) => {
  inputComment.value = false
  currentSelectedUser.value = user
  currentSelectedUserStringInfo.value = user.firstName + " " + user.lastName
  currentSelectedUserComments.value = await getUserComments(user._id).then(comments => comments)
  console.log(currentSelectedUserComments.value)
}


</script>
<template>


  <div class="columns">

    <div class="column">
      <div class="card" v-for="u in allUsers" style="height: 250px; width: 600px; margin-bottom: 5px;">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ u.firstName }} {{ u.lastName }} ({{ u.age + " years" }})</p>
            </div>
          </div>
          <div class="content" v-for="excercise in currentSelectedUserExcercises">
            {{ excercise.excercise }}: {{ excercise.description }}
          </div>
          <div>
            <span
              style="color: blue; cursor: pointer; float: right; background-color:aquamarine; padding: 10px; color: black;"
              v-on:click="showCommentBox(u)">Comment</span>
            <span style="padding: 20px; float: right; "></span>
            <span
              style="color: blue; cursor: pointer; float: right; background-color:coral; padding: 10px; color: black;"
              v-on:click="getComments(u)">Read comments
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="column" style="margin-top: 15px;">
      <h1 style="font-weight: bold; margin-bottom: 20px;">Comments for {{ currentSelectedUserStringInfo }}</h1>
      <h3>
        <span v-if="(currentSelectedUserComments.length > 0)" style="color:coral">{{
            currentSelectedUserComments.length
        }} comments</span>
        <span v-if="(currentSelectedUserComments?.length == 0)" style="color:coral">Be the first to
          comment</span>
      </h3><br>
      <div v-if="inputComment">

        Add Comment
        <textarea class="textarea is-info" placeholder="Add your comments here" v-model="commentText">

        </textarea>
        <div class="buttons" style="margin-top: 10px; float: right;">
          <button class="button is-info" style="float: right;" v-on:click="addComment()">Submit</button>
        </div>
      </div>
      <div v-else>
        <p v-if="(currentSelectedUserComments.length == 0)">There no comments for this user</p>
        <div v-else>
          <article class="message" style="margin-top: 3px;" v-for="comment in currentSelectedUserComments">
            <div class="message-body">
              <strong>{{ comment.createdBy }} said</strong><br>
              {{ comment.title }}
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

</template>