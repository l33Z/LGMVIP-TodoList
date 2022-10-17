import { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./input.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Tooltip from "@material-ui/core/Tooltip";

const InputField = () => {
  
  // ------------------------------ Retrieving Data From Local Storage ------------------------------
  const getLocalStorageData = () => {
    const todoLists = localStorage.getItem("todorecords");
    if (todoLists) {
      return JSON.parse(todoLists);
    } else {
      return [];
    }
  };

  const [input, setInput] = useState("");
  const [records, setRecords] = useState(getLocalStorageData());
  const [storeId, setStoreId] = useState(null);
  const [editToggle, setEditToggle] = useState(true);

  // ------------------------------ Add New Task  ------------------------------
  const addition = () => {
    if (!input) {
      toast.error("🤦‍♂️ Please Enter Text", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (!editToggle && input) {
      setRecords(
        records.map((element) => {
          if (element.id === storeId) {
            return { ...element, data: input };
          }
          return element;
        })
      );
      setEditToggle(true);
      setInput("");
      setStoreId(null);
    } else {
      const newDataObject = {
        id: new Date().getTime().toString(),
        data: input,
      };
      setRecords([...records, newDataObject]);
      setInput("");
    }
  };

  // ------------------------------ Delete Task ------------------------------
  const deleteItem = (index) => {
    const newData = records.filter((element, eindex) => {
      return element.id !== index;
    });
    setRecords(newData);
  };

  // ------------------------------ Edit Task ------------------------------
  const editItem = (index) => {
    const resultData = records.find((element) => {
      return element.id === index;
    });
    setInput(resultData.data);
    setStoreId(resultData.id);
    setEditToggle(false);
  };

  // ------------------------------ Delete All Task ------------------------------
  const deletAll = () => {
    setRecords([]);
  };

  useEffect(() => {
    localStorage.setItem("todorecords", JSON.stringify(records));
  }, [records]);

  return (
    <>
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="main">
        <div className="field">
          <input
            type="text"
            placeholder="✍ Add Items "
            id="textinput"
            name="textinput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {editToggle ? (
            <Tooltip title="Add">
              <Button variant="contained" id="btn" onClick={addition}>
                <AddIcon id="addbtn" />
              </Button>
            </Tooltip>
          ) : (
            <Button variant="contained" id="eddbtn" onClick={addition}>
              <SpellcheckIcon id="addbtn" />
            </Button>
          )}
        </div>
      </div>
      <div className="mainFrame">
        {records.map((element) => {
          return (
            <>
              <div className="mainList" key={element.id + Math.random()}>
                <div className="textArea">{element.data}</div>
                <div className="btns">
                  <Tooltip title="Delete">
                    <Button
                      variant="contained"
                      id="dbtn"
                      onClick={() => deleteItem(element.id)}
                    >
                      <DeleteIcon id="delbtnicon" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Button
                      variant="contained"
                      id="ebtn"
                      onClick={() => editItem(element.id)}
                    >
                      <EditIcon id="editbtnicon" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </>
          );
        })}
        {records.length > 0 ? (
          <Tooltip title="Delete All">
            <Button
              variant="contained"
              id="delallbtn"
              color="secondary"
              onClick={deletAll}
            >
              <DeleteIcon id="delbtnicon" />
              Delete All
            </Button>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default InputField;
