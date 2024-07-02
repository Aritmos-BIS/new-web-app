import db from "@/libs/db";
import StudentCard from "@/components/StudentCard";
import { Container, Grid, Box } from "@mui/material";

async function PageGroup({ params }) {
  const students = await db.users.findMany({
    where: {
      id_group: params.id_groups,
      isprofessor: false,
    },
  });

  console.log("soy students");
  console.log(students);

  return (
    <Container sx={{ minHeight: "100vh", mt: 5 }}>
      <Grid container spacing={3}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} key={student.id_group}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <StudentCard student={student} params={params} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PageGroup;
