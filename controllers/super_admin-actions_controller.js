const create_UID = require("../middleware/creating_UID");
const jwt = require("jsonwebtoken");
const VIP_Scheme = require("../Schemas/VIP");
const secretKeys = require("../libs/JWTs/secret_keys");
const { v4: UID } = require("uuid");
const Admin_Scheme = require("../Schemas/Admin");
const Center = require("../Schemas/Center");
const bcrypt = require("bcrypt");
const Admin = require("../Schemas/Admin");
const Teacher = require("../Schemas/Teacher");
const Group = require("../Schemas/Group");
const reorganize_groups_function = require("../middleware/update_all_groups_data");
const Student = require("../Schemas/Student");

// CENTER MANAGEMENT
const create_center = async (req, res) => {
	const { ...data } = req.body;
	for (let i in data) {
		if (!data[i]) {
			return res.json({ statusCode: 400, message: "please provide data with property" + data[i] });
		}
	}

	//  convert the UID to number
	const foundCenter = await Center.findOne({ name: data.name }).exec();
	if (foundCenter) {
		res.json({ statusCode: 409, message: "Existing Center Data Entered" });
		return;
	}
	console.log(data.token)
	jwt.verify(data.token, secretKeys.super_admin, (err, user) => {
		if (err) {
			 res.json({ statusCode: 401, message: "expired token" });
			 return;
		}
	});

	const wholeCenters = await Center.find().exec();
	const NewCenter = new Center({
		UID: UID(),
		name: data.name,
		contact: data.contact,
	});

	try {
		await NewCenter.save();
		return res.json({ statusCode: 200, message: `Your center was successfully created` });
	} catch (error) {
		throw error;
	}
};

// get centers action
const get_whole_centers = async (req, res) => {
    const { token } = req.body; // No need for full destructuring if you're only using token
	if(!token || token=="undefined"){
		return res.status(400).json({message:"Please Provide token"})
	}
    // Verify JWT token
    jwt.verify(token, secretKeys.super_admin, async (err, match) => {
        if (err) {
			console.log(token)
            return res.status(401).json({ message: "Unauthorized", data: null }); // Return 401 Unauthorized if there's an error
        }

        try {
            // Fetch centers only after successful JWT verification
            const whole_centers = await Center.find().exec();

            if (whole_centers) {
                return res.status(200).json(whole_centers); // Return centers if found
            } else {
                return res.status(404).json({ message: "No centers found", data: null }); // Handle case where no centers are found
            }
        } catch (error) {
            return res.status(500).json({ statusCode: 500, message: error.message }); // Return 500 in case of server error
        }
    });
};


// delete centers action

const delete_center = async (req, res) => {
	const { ...data } = req.body;
	if (!data.token || !data.UID) return res.sendStatus(406);
	const foundCenter = await Center.findOne({ UID: data.UID });
	if (!foundCenter) {
		return res.json({ statusCode: 400, message: `${token}` });
	}
	jwt.verify(data.token, secretKeys.super_admin, (err, hash) => {
		if (err) {
			return res.sendStatus(401);
		}
	});
	await Center.deleteOne({ UID: data.UID });
	return res.json({ statusCode: 200, message: "Successfully deleted" });
};

// VIP MANAGEMENT BY SUPER ADMIN PAGE
const add_vip = async (req, res) => {
	const { ...data } = req.body;
	if (
		!data.token ||
		!data.firstname ||
		!data.username ||
		!data.age ||
		!data.email ||
		!data.address ||
		!data.password ||
		!data.phone_number ||
		!data.center_id
	) {
		return res.status(400).json({ message: "Provide whole required data please" });
	}

	// Verify JWT token
	jwt.verify(data.token, secretKeys.super_admin, async (err, user) => {
		if (err) {
			return res.status(401).json({ message: "Invalid or expired token" });
		}

		// Check if VIP already exists
		try {
			const foundVIP = await VIP_Scheme.findOne({
				username: data.username,
				firstname: data.firstname,
				email: data.email,
			});
			// TODO uncomment foundVIP after writing code for updating the center data
			if (foundVIP) {
				return res.sendStatus({ message: "Existing Entry" }); // Conflict, VIP already exists
			}

			// Generate unique ID and hash the password
			const uniqueId = UID();
			const hashed_password = await bcrypt.hash(data.password, 10);

			// Create new VIP entry
			const NewVIP = new VIP_Scheme({
				_id: uniqueId,
				firstname: data.firstname,
				lastname: data.lastname,
				username: data.username,
				age: data.age,
				email: data.email,
				address: data.address,
				password: hashed_password,
				loggedIn: false,
				phone_number: data.phone_number,
				center_id: data.center_id,
			});

			// Save to database
			await NewVIP.save();
			// respectively add the CEO to the center itself
			const foundCenter = await Center.findOne({ UID: data.center_id }).exec();

			if (foundCenter) {
				await Center.updateOne({ UID: data.center_id }, { data: { CEO: uniqueId } });
			} else {
				return res.json({ message: "unknown center celected" });
			}
			return res.status(200).json({ message: "VIP successfully saved" });
		} catch (error) {
			// Handle any database-related errors
			return res.status(500).json({ message: "Error saving VIP: " + error.message });
		}
	});
};

const get_whole_vips = async (req, res) => {
	const { token } = req.body;
	if (!token) {
		return res.json({ statusCode: 400, message: "please enter token:" });
	}
	// verify the token with jwt
	jwt.verify(token, secretKeys.super_admin, (err, isMatch) => {
		if (err) return res.json("Expired or Incorrect token entered!");
	});

	const whole_vips = await VIP_Scheme.find().exec();

	if (!whole_vips) {
		return res.json("No vips found");
	} else {
		return res.json(whole_vips);
	}
};

// delete vip
const deleteVIP = async (req, res) => {
	
	const { token, _id } = req.body;
	console.log("coming_id is: ",_id)
	if (!token || !_id) {
		return res.sendStatus(401);
	}
	// verify token
	jwt.verify(token, secretKeys.super_admin, (err, isMatch) => {
		if (err) {
			return res.json({ statusCode: 401, message: "expired session, please reload" });
		}
	});
	try {
		// find the vip coming the id
		const found_VIP = await VIP_Scheme.findOne({ _id }).exec();
		// console to see found VIP
		if (!found_VIP) {
			return res.json({ statusCode: 404, message: "Not Found User" });
		}
		// extract the  center id from found VIP
		const foundVIPCenterId = found_VIP.center_id;
		// found the center in order to update the center data
		const relativeCenter = await Center.findOne({ UID: foundVIPCenterId }).exec();
		// console center by ID
		// what if the center is existing
		if (relativeCenter) {
			await Center.updateOne({ UID: foundVIPCenterId }, { data: { ...relativeCenter.data, CEO: "" } });
		}

		const deleteRes = await VIP_Scheme.deleteOne({ _id }).exec();

		return res.json({ statusCode: 200, message: "Successfully deleted from the base" });
	} catch (error) {
		console.log(error)
		return res.status(400).json({message:"Error: "+error})
	}
};

// ADMIN MANAGEMENT
// get admins route
const get_admins = async (req, res) => {
	const { token } = req.body;
	jwt.verify(token, secretKeys.super_admin, (err, isMatch) => {
		if (err) {
			return res.json({ statusCode: 401, message: "Expired Token!" });
		}
	});
	const wholeAdminsData = await Admin_Scheme.find();
	const responseToFront = { statusCode: 200, message: "Successfully fetched", data: wholeAdminsData };
	return res.json(responseToFront);
};
// add admin route
const add_admin = async (req, res) => {
	const {
		firstname,
		lastname,
		username,
		age,
		email,
		address,
		password,
		loggedIn,
		phone_number,
		center_id,
		vip_id,
		token,
	} = req.body;
	// requires attributes of the object are
	const _id = UID();

	jwt.verify(token, secretKeys.super_admin, (err, isMatch) => {
		if (err) {
			return res.sendStatus(401);
		}
	});
	// check for dublicates
	const isDublicate = await Admin_Scheme.findOne({ username, email }).exec();
	if (isDublicate) {
		return res.sendStatus(409);
	}

	const hashed_password = await bcrypt.hash(password, 10);

	const NewAdmin = new Admin_Scheme({
		_id: _id,
		firstname,
		lastname,
		username,
		age,
		email,
		address,
		password: hashed_password,
		loggedIn,
		phone_number,
		center_id,
		vip_id,
	});

	try {
		NewAdmin.save();
		const foundCenterById = await Center.findOne({ UID: center_id }).exec();
		const updateFoundCenterAdminData = await Center.updateOne(
			{ UID: center_id },
			{ data: { ...foundCenterById.data, admin: _id } },
		);
		const foundVIPById = await VIP_Scheme.findOne({ _id: vip_id }).exec();
		const updatedFoundVIP = await VIP_Scheme.updateOne({ _id: vip_id }, { admin_id: _id });
		return res.status(200).json({message: "Successfully added" });
	} catch (error) {
		return res.status(400).json( {message: "Error occured" + error });
	}
};

// delete admin

const delete_admin = async (req, res) => {
	const { token, _id } = req.body;
	console.log(token)
	if (!token || !_id) {
		return res.status(400).json({  message: "Please provide details" });
	}

	jwt.verify(token, secretKeys.super_admin, (err) => {
		if (err) {
			return res.status(401).json({ message: "Unauthorized request/ token expired" });
		}
	});

	try {
		const deletionRes = await Admin.deleteOne({ _id });
		const updatedData = await Admin.find().exec();
		if (deletionRes.acknowledged) {
			 return res.status(200).json({message: "Successfully deleted", data: updatedData });
		}
		if (!deletionRes.acknowledged) {
			 return res.status(400).json({  message: "Deletion unsuccessful", data: updatedData });
		}
	} catch (error) {
		return res.sendStatus(400);
	}
};

// group controllers
const get_groups = async (req, res) => {
	const token = req.headers.authorization;
	if (!token) return res.status(400).json({ message: "Please provide token!" });

	jwt.verify(JSON.parse(token), secretKeys.super_admin, (err, isMatch) => {
		if (err) {
			return res.status(401).json({ message: "Expired or Invalid token" });
		}
	});

	var all_groups = [];
	try {
		all_groups = await Group.find().exec();
	} catch (error) {
		res.status(400).json({ message: "Error Occured: " + error.message });
		return;
	}

	// reorganize the all_groups_data
	const reorganized = await reorganize_groups_function(all_groups);
	try {
		return res.status(200).json({ message: "Successfully loaded data", data: reorganized });
	} catch (error) {
		res.status(400).json({ message: "Error Occured: " + error.message });
		return;
	}
};

// add group
const add_group = async (req, res) => {
	const token = req.headers.authorization;
	const { name, center_id, teacher_id, start_date, end_date, description } = req.body;
	if (!name || !center_id || !teacher_id || !start_date || !end_date || !description) {
		return res.status(400).json({ message: "Please, Provide all of the required fields of data!" });
	}
	if (!token) {
		return res.status(401).json({ message: "Expired or Invalid Token" });
	}

	jwt.verify(JSON.parse(token), secretKeys.super_admin, (err, isMatch) => {
		if (err) return res.status(401).json({ message: "Unauthorized!!!" });
	});
	const newGroup = new Group({
		name,
		center_id,
		teacher_id,
		start_date,
		end_date,
		description,
	});

	// prevent dublicates
	try {
		const isDuplicate = await Group.findOne({ name, teacher_id, center_id });
		if (isDuplicate) {
			return res.status(409).json({ message: "Existing Entry/Conflict!" });
		}
	} catch (error) {
		return res.status(400).json({ message: "Existing Entry/Conflict cheking failed!" });
	}

	try {
		await newGroup.save();
		return res.status(200).json({ message: "Successfully saved" });
	} catch (error) {
		return res.status(400).json({ message: "Error occured" + error.message });
	}
};
// delete group

const delete_group = async (req, res) => {
	const token = req.headers.authorization;
	const { _id } = req.body;
	if (!token) return res.status(401).json({ message: "Please provide TOken" });
	//    verify with JWT
	jwt.verify(JSON.parse(token), secretKeys.super_admin, async (err, isMatch) => {
		if (err) return res.sendStatus(401);
		if (isMatch) {
			try {
				const foundCenter = await Group.findOne({ _id }).exec();
				if (foundCenter) {
					const response = await Group.deleteOne({ _id });
					if (response.acknowledged) {
						return res.status(200).json({ message: "Successfully deleted" });
					} else {
						return res.status(400).json({ message: "Saving process failed" });
					}
				} else {
					// if the center with ID does not exist
					return res.status(404).json({ message: "Not found center" });
				}
			} catch (error) {
				return res.json({ message: `Error occured: ${error}` });
			}
		}
	});
};
// get teachers
const get_teachers = async (req, res) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(400).json({ message: "Please provide Token!" });
	}
	jwt.verify(JSON.parse(token), secretKeys.super_admin, (err, isMatch) => {
		if (err) {
			return res.status(401).json({ message: "Expired or Invalid token!" });
		}
	});

	try {
		const wholeTeachers = await Teacher.find().exec();
		if (wholeTeachers.length === 0) {
			return res.status(405).json({  message: "No any Teacher has been registered!" });
		} else {
			return res.status(200).json({ message: "Data loaded", data: wholeTeachers });
		}
	} catch (error) {
		return res.status(400).json({ message: "Error occured: " + error });
	}
};

const get_admin = async (req, res) => {
	const { authorization, _id } = req.headers;

	jwt.verify(JSON.parse(authorization), secretKeys.super_admin, async (err, isMatch) => {
		if (err) {
			return res.status(401).json({ message: "Expired or invalid Token" });
		}

		const foundAdmin = await Admin_Scheme.findOne({ _id }).exec();

		if (foundAdmin) {
			return res.status(200).json({ message: "Found", data: foundAdmin });
		} else {
			return res.status(404).json({ message: "Not found Admin" });
		}
	});
};


const add_teacher = async (req, res) => {
	// Different approach, attach the token in headers.authorization
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: "Please provide the token!!!" });
	}

	const { firstname, lastname, username, email, address, password, phone_number, subject } = req.body;

	if (!firstname || !lastname || !username || !email || !address || !password || !phone_number || !subject) {
		return res.status(400).json({ message: "One of the required properties is missing" });
	}

	// Verify token
	try {
		const decoded = jwt.verify(JSON.parse(token), secretKeys.super_admin);
	} catch (err) {
		return res.status(401).json({ message: `Token verification failed: ${err.message}` });
	}

	// Generate unique ID for the teacher
	const _id = UID();

	const newTeacher = new Teacher({
		_id,
		firstname,
		lastname,
		username,
		email,
		address,
		password,
		loggedIn: false,
		phone_number,
		subject,
		rank: 0,
	});

	// Check for existing teacher
	try {
		const foundTeacher = await Teacher.findOne({ email, phone_number }).exec();
		if (foundTeacher) {
			return res.status(409).json({ message: "Existing Teacher Entry" });
		}

		// Save the new teacher
		await newTeacher.save();
		const updatedData = await Teacher.find().exec();
		return res.status(201).json({ message: "Teacher added successfully!", data: updatedData });
	} catch (error) {
		console.error("Error saving teacher:", error);
		return res.status(500).json({ message: "An Error occurred: " + error.message });
	}
};

module.exports = add_teacher;

// delete teacher
const delete_teacher = async (req, res) => {
	// extract the token
	const token = req.headers.authorization;
	const { _id } = req.body;
	if (!token || !_id) {
		return res.status(400).json({ message: "Please token or _id issue occuring!!!" });
	}
	// verify the token
	jwt.verify(JSON.parse(token), secretKeys.super_admin, async (err, Match) => {
		if (err) {
			return res.status(401).json({ message: `${err}` });
		}
		try {
			// initially find if the teacher exists before directly giving a delete request
			const foundTeacher = await Teacher.findOne({ _id }).exec();
			if (!foundTeacher) return res.status(404).json({ message: "Trial to delete non-existing teacher" });
			const deletedResponse = await Teacher.deleteOne({ _id });
			if (deletedResponse.acknowledged) {
				const updatedTeachersData = await Teacher.find().exec();
				if (updatedTeachersData)
					return res
						.status(200)
						.json({ message: "Deleted Successfully and data has been updated for you", data: updatedTeachersData });
			}
		} catch (error) {
			return res.status(400).json({ message: "Error: " + error });
		}
	});
};

const add_student = async (req, res) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "Please provide the token" });
	}
	const { firstname, lastname, username, email, address, password, phone_number, group_id } = req.body;
	if (!firstname || !lastname || !username || !email || !address || !password || !phone_number || !group_id) {
		return res.status(400).json({ message: "Please provide all datum" });
	}
	jwt.verify(JSON.parse(token), secretKeys.super_admin, async (err, isMatch) => {
		if (err) return res.status(401).json({ message: "Expired or Invalid token" });
		if (isMatch) {
			const hashedPWD = await bcrypt.hash(password, 10);
			const newStudent = new Student({
				firstname,
				lastname,
				username,
				email,
				address,
				password: hashedPWD,
				loggedIn: false,
				phone_number,
				group_id,
				rank: [],
			});
			const isDublicate = await Student.findOne({ firstname, lastname, email }).exec();

			if (isDublicate) {
				return res.status(409).json({ message: "Dublicate value detected" });
			} else {
				try {
					const response = await newStudent.save();
					return res.status(200).json({ message: "New student has been successfully created" });
				} catch (error) {
					return res.status(400).json({ message: `Error:${error}` });
				}
			}
		}
	});
};

const get_students = async (req, res) => {
	const token = req.headers.authorization;
	if (!token || token == "undefined") {
		return res.status(400).json({ message: "Please provide correct token" });
	}
	jwt.verify(JSON.parse(token), secretKeys.super_admin, async (err) => {
		if (err) return res.status(401).json({ message: "Expired or Invalid token" });
		const whole_students = await Student.find().exec();
		if (whole_students) {
			return res.status(200).json({ message: "Students Data loaded successfully",data:whole_students });
		} else {
			return res.status(404).json({ message: "Students were not found" });
		}
	});
};



const delete_student = async (req, res) => {

    const token = req.headers.authorization;
    const { _id } = req.body;

    // Check for student ID
    if (!_id) {
        return res.status(400).json({ message: "Please provide student ID" });
    }

    // Check for token
    if (!token || token === "undefined") {
        return res.status(400).json({ message: "Please provide a valid token" });
    }

    // Verify JWT token
    try {
        await new Promise((resolve, reject) => {
            jwt.verify(token.replace("Bearer ", ""), secretKeys.super_admin, (err) => {
                if (err) {
                    reject(res.status(401).json({ message: "Expired or invalid token" }));
                } else {
                    resolve();
                }
            });
        });

        // Check if student exists
        const student = await Student.findOne({ _id });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Attempt to delete the student
        const deletionResult = await Student.deleteOne({ _id });
        if (deletionResult.acknowledged) {
            return res.status(200).json({ message: "Student successfully deleted" });
        } else {
            return res.status(400).json({ message: "Deletion failed" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};



module.exports = {
	get_teachers,
	get_admins,
	get_whole_centers,
	get_whole_vips,
	get_admin,
	get_groups,
	get_students,
	add_vip,
	add_admin,
	create_center,
	add_teacher,
	add_group,
	add_student,

	delete_center,
	deleteVIP,
	delete_admin,
	delete_teacher,
	delete_group,
	delete_student
};
