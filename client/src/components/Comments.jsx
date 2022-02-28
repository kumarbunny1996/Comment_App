import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Button from "./Button";
import url from "../utils/env.js";

const CommentSection = ({ comment, email }) => (
  <div className="flex md:flex-row flex-col items-center justify-between text-white mt-10 px-10">
    <h4 className="text-base font-semibold flex-initial w-[30%] mr-3">
      {email}
    </h4>
    <div className="p-2 md:mt-0 mt-4 flex-initial w-[70%] bg-transparent rounded-sm white-glassmorphism h-[100px] overflow-auto">
      <p>{comment}</p>
    </div>
  </div>
);

const Comments = () => {
  const {
    authToken,
    isLogin,
    isLoading,
    setLoading,
    user,
    comments,
    setAllComments,
    showComments,
    setShowComments,
    getAllComments,
  } = useContext(AppContext);
  const [userComments, setUserComments] = useState([]);
  const [comment, setComment] = useState("");

  const axiosConfig = {
    headers: {
      Authorization: authToken,
    },
  };

  const handleSubmit = () => {
    if (comment === "") return;
    setLoading((prevstate) => !prevstate);
    axios
      .post(`${url}/api/user/comment`, { comment }, axiosConfig)
      .then((res) => {
        console.log(res.data);
        let obj = res.data.data;
        if (comments.length === 0) {
          setShowComments((prevstate) => !prevstate);
        }
        setAllComments((prevState) => [...prevState, obj]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading((prevstate) => !prevstate));
  };

  const handleFilter = () => {
    let email = user.email;
    console.log(email);
    if (!email) return;
    let filterComments = comments.filter((item) => item.email === email);
    console.log(filterComments);
    if (showComments) {
      setShowComments((prevState) => !prevState);
    }
    setUserComments(() => filterComments);
  };

  return (
    <>
      {(authToken || isLogin) && (
        <div className="min-h-screen flex justify-center text-white items-center flex-col">
          <div className="md:w-[50%] flex justify-center items-center md:flex-row flex-col">
            <div>
              <p className="text-base italic mb-1">
                What would you like to share with world?
              </p>
              <textarea
                name="comment"
                rows="6"
                cols="40"
                wrap="off"
                className="text-lg outline-none rounded-sm overflow-auto text-white p-2 bg-transparent white-glassmorphism"
                onChange={(e) => setComment(() => e.target.value)}
                autoFocus
                required
              ></textarea>
            </div>
            <Button
              classProps="w-[150px] flex-initial ml-[35px]"
              content="Submit"
              isLoading={isLoading}
              handleClick={handleSubmit}
            />
          </div>
          <div className="w-[50%] h-[0.5px] bg-transparent white-glassmorphism mt-10"></div>
          {comments.length === 0 && (
            <div className="mt-10 w-[50%] flex justify-center items-center text-2xl text-white">
              There are no comments yet!
            </div>
          )}
          {comments.length !== 0 && (
            <div className="text-white mt-10 md:w-[50%]">
              <div className="flex justify-between items-center text-white">
                <h3 className="font-semibold text-xl">
                  {showComments ? "Comments" : "Your Comments"}
                </h3>
                <Button
                  classProps="w-[150px] flex-initial"
                  content={showComments ? "Filter" : "All Comments"}
                  isLoading={isLoading}
                  handleClick={showComments ? handleFilter : getAllComments}
                />
              </div>
              <>
                {showComments
                  ? comments.map((item, index) => (
                      <CommentSection
                        key={index}
                        comment={item.comment}
                        email={item.email}
                      />
                    ))
                  : userComments.map((item, index) => (
                      <CommentSection
                        key={index}
                        comment={item.comment}
                        email={item.email}
                      />
                    ))}
              </>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Comments;
