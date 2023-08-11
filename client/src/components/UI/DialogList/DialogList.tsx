import Dialog from "../Dialog/Dialog";
import classes from './DialogList.module.css'

function DialogList() {
  return (
    <ul className={classes.dialog_list}>
      <Dialog />
      <Dialog />
      <Dialog />
    </ul>
  );
};

export default DialogList;