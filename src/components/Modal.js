import React, {useContext} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TodoContext } from "../context/TodoContext";

export default function Modal({ props }) {
  const { state, dispatch } = useContext(TodoContext);

  const backdrop = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const close = () => {
    dispatch({ type: "CHNG_POP", payload: false });
    dispatch({ type: "CHNG_POPUP", payload: false });
    window.location = "/todo";
  };

  const modal = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "200px",
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {state.pop && state.popUp ? (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <h4 onClick={close}>X</h4>
            <p>
              Sorry, due to hosting issues we won't be able to send a reminder email for your schedule. Please bear with us. Thanks
            </p>
          </motion.div>
        </motion.div>
      ) : (
        false
      )}
    </AnimatePresence>
  );
}
