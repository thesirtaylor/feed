import _ from "lodash";
//we implememt lodash to memoize payload data (more like cache) to prevent
//overfetching (especially the user endpoint)
import jsonPlaceholder from "../apis/jsonPlaceholder";

//whenever we call an action creator inside an action creator we need to
//dispatch the inner action creator inside the outside action creator

//this solves the problem of overfetching data better than the lodash solution
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //then we use getState to load up the state data
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};
//this is simply an arrow function returning another arrow function
export const fetchPosts = () => async (dispatch, getState) => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({
    type: "FETCH_POSTS",
    payload: response.data,
  });
};

// export const fetchUser = (id) => (dispatch, getState) => {
//   _fetchUser(id, dispatch)
// };

//private function starting with _
// const _fetchUser = _.memoize(async(id, dispatch) => {
//id of user to get
export const fetchUser = (id) => async (dispatch, getState) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
};
// )
//actions passed into the dispatch function will be sent through all our middlewares
//and evetually forwarded off to reducers
//dispatch and getstate functions have unlimited access over our apps data
//dispatch function has unlimited power to initate changes to the data
//on the redux side of our app
//getstate can be called on our redux store and will return all the data or all
//the states on our store
//with redux-thunk our action can return both a function and an object
//if it returns an object, redux-thunk automatically forwards it our reducers
//if it's a function it will bw invoked with the dispatcha and getState arguments
//action creators must return PLAIN JS OBJECTS with a type property and a
//data payload(optional)
//with redux-thunk we can manually dispatch some action later in the future
