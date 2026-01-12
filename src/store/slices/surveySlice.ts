import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSurveys as fetchSurveysAPI, createSurvey as createSurveyAPI } from '../../api/surveyAPI';

interface Survey {
    id: string;
    title: string;
    description: string;
    // Add more fields as needed
}

interface SurveyState {
    surveys: Survey[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SurveyState = {
    surveys: [],
    isLoading: false,
    error: null,
};

export const fetchSurveys = createAsyncThunk('surveys/fetchSurveys', async () => {
    const response = await fetchSurveysAPI();
    return response.data;
});

export const createSurvey = createAsyncThunk(
    'surveys/createSurvey',
    async (surveyData: Partial<Survey>) => {
        const response = await createSurveyAPI(surveyData);
        return response.data;
    }
);

const surveySlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSurveys.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSurveys.fulfilled, (state, action) => {
                state.isLoading = false;
                state.surveys = action.payload;
            })
            .addCase(fetchSurveys.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch surveys';
            })
            .addCase(createSurvey.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSurvey.fulfilled, (state, action) => {
                state.isLoading = false;
                state.surveys.push(action.payload);
            })
            .addCase(createSurvey.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to create survey';
            });
    },
});

export default surveySlice.reducer;
