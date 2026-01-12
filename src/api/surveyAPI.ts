import { api } from './axiosConfig';

export const fetchSurveys = async () => {
    return api.get('/surveys');
};

export const createSurvey = async (surveyData: any) => {
    return api.post('/surveys', surveyData);
};
