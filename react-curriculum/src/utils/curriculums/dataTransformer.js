//funcion para formatear los datos del curriculum
export const formatCVData = (data) => {
    const {
        user_info,
        user_education,
        user_work_experience,
        user_skills,
        user_languages
    } = data;

    return {
        name: user_info.name,
        surname: user_info.surname,
        ocupation: user_info.ocupation,
        personalDescription: user_info.personalDescription,
        city: user_info.city,
        municipality: user_info.municipality,
        address: user_info.address,
        colony: user_info.colony,
        postalCode: user_info.postal_code,
        phone: user_info.phone,
        email: user_info.email,
        photo: `http://127.0.0.1:8000/utils/photo/${user_info.photo}`,

        educationRecords: user_education.map(edu => ({
            school: edu.school,
            citySchool: edu.city_school,
            certification: edu.certification,
            field_of_study: edu.field_of_study,
            start_date: edu.start_date,
            end_date: edu.end_date,
            currently_studying: edu.currently_studying
        })),

        workRecords: user_work_experience.map(work => ({
            position: work.position,
            company: work.company,
            city: work.work_city,
            municipality: work.work_municipality,
            startDate: work.work_start_date,
            endDate: work.work_end_date,
            currentlyWorking: work.currently_working,
            activities: work.activities
        })),

        skillsRecords: user_skills.map(skill => ({
            skill_name: skill.skill_name
        })),

        languageRecords: user_languages.map(lang => ({
            language: lang.language,
            level: lang.level
        }))
    };
};