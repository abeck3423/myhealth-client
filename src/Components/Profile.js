import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProfileForm from "./ProfileForm";

function Profile(props) {
  const cardStyle = {
    height: "200vw",
  };
  // State for controlling the Dialogs
  const [profileDialogOpen, setProfileDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState("");

  // Open and close the Add Form
  const handleProfileDialogToggle = () => {
    setProfileDialogOpen(!profileDialogOpen);
  };

  return (
    <div className="profile">
      <br />
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={cardStyle} sx={{ minWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Alex Becker
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is example profile info
                <br />
                <br />
                <br />
                <br />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <ProfileForm
                    profileDialogOpen={profileDialogOpen}
                    handleToggle={handleProfileDialogToggle}
                    type={dialogType}
                    setDialogType={setDialogType}
                  />
                  Add
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
