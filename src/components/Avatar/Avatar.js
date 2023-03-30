import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "./Avatar.css";
import { ListItemSecondaryAction, Radio } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Avatar(props) {
  const { avatarId } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="user">
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 400, width: 400 }}
          image={`/image/avatar${avatarId}.png`}
          title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User info
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen}>Change Avatar</Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[0, 1, 2, 3, 4, 5].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value}>
                  <CardMedia
                    height="100"
                    component="img"
                    alt={`Avatar${value}`}
                    image={`/image/avatar${value}.png`}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                  />
                  <ListItemSecondaryAction>
                    <Radio
                      edge="end"
                      value={value}
                      onChange={handleChange}
                      checked={"" + selectedValue === "" + value}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
