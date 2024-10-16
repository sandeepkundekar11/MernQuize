const AsynchHandler = require("express-async-handler");
const { user } = require("../Schema/UserSchema");
const GetLeaderBoard = AsynchHandler(async (req, res) => {
  try {
    const LeaderBoard = await user.find("");
  } catch (error) {}
});
