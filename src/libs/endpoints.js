import * as R from 'ramda'; 
import db from "@/libs/db";

export const getProfiles = async (id, type) => {

  const entityToFind = type === 'student' ? db.student : db.professor;

  const profileFound = await entityToFind.findMany({
    where:{
        id: Number(id),
    },
    include:{
      group: true,
    },
  }); 

  const filteredProfile = R.omit([ 'password', 'groupId', 'created_at', 'active'], profileFound[0])

  const filteredGroup = R.omit(['professorId', 'created_at', 'active'], profileFound[0].group);

  const profile = {...filteredProfile, group: filteredGroup}

  return profile 

}

export const getGroup = async (id) => {
  const fullGroup = await db.group.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      students: true,
    },
  });

  const students = fullGroup.students.map((student) => { 
    return R.omit(['password', 'groupId', 'created_at', 'active'], student)
  });

  const filteredGroup = R.omit(['professorId', 'created_at', 'active', 'students'], fullGroup);

  const group = { ...filteredGroup, students: students}

  return group

}