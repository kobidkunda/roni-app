import { combineReducers } from 'redux';

const INITIAL_STATE = {
    current: [],
    Gender_Array: [
        { id: '1', clas_nam: 'Male', isSelect: true },
        { id: '2', clas_nam: 'Female', isSelect: false },
    ],
    JobType_Array: [
        { id: '1', clas_nam: 'Part-Time', isSelect: true },
        { id: '2', clas_nam: 'Full-Time', isSelect: false },
        { id: '3', clas_nam: 'Seasonal', isSelect: false },
        { id: '4', clas_nam: 'Only-Weekends', isSelect: false },
    ],
    JobTime_Array: [
        { id: '1', clas_nam: 'Day', isSelect: true },
        { id: '2', clas_nam: 'Night', isSelect: false },
        { id: '3', clas_nam: 'Any', isSelect: false },
    ],
    Job_Seasonal_Time_Array: [
        { id: '1', clas_nam: 'Winter', isSelect: true },
        { id: '2', clas_nam: 'Spring', isSelect: false },
        { id: '3', clas_nam: 'Summer', isSelect: false },
        { id: '4', clas_nam: 'Fall', isSelect: false },
    ],
    PreferredWorkRegion_Array: [
        { id: '1', clas_nam: 'Downtown', isSelect: true },
        { id: '2', clas_nam: 'Midtown', isSelect: false },
        { id: '3', clas_nam: 'Central', isSelect: false },
    ],
    DistanceFromHome_Array: [
        { id: '1', clas_nam: '5 KM.', isSelect: true },
        { id: '2', clas_nam: '20 KM.', isSelect: false },
        { id: '3', clas_nam: '50 KM.', isSelect: false },
    ],
    IndustryType_Array: [
        { id: '1', clas_nam: 'Restaurant', isSelect: true },
        { id: '2', clas_nam: 'Trades & Assistance', isSelect: false },
        { id: '3', clas_nam: 'Retail Shops', isSelect: false }
    ],

    RestaurantCategory: [
        { id: '1', clas_nam: 'Bistro', isSelect: false },
        { id: '2', clas_nam: 'Eatery', isSelect: false },
        { id: '3', clas_nam: 'Breakfast Diner', isSelect: false },
        { id: '4', clas_nam: 'Buffet', isSelect: false },
        { id: '5', clas_nam: 'Event Center', isSelect: false },
        { id: '6', clas_nam: 'Banquet or Reception Hall', isSelect: false },
        { id: '7', clas_nam: 'Fast-food Kiosk', isSelect: false },
        { id: '8', clas_nam: 'Ice-Cream Cart', isSelect: false },
        { id: '9', clas_nam: 'Food Truck', isSelect: false },
        { id: '10', clas_nam: 'Ice-Cream Parlor', isSelect: false },
        { id: '11', clas_nam: 'Food Cart', isSelect: false },
        { id: '12', clas_nam: 'Deli', isSelect: false },
        { id: '13', clas_nam: 'Pastry Shop', isSelect: false },
        { id: '14', clas_nam: 'Coffer Shop', isSelect: false },
        { id: '15', clas_nam: 'Doughnut Shop', isSelect: false },
        { id: '16', clas_nam: 'Tea Shop', isSelect: false },
        { id: '17', clas_nam: 'Steak House', isSelect: false },
        { id: '18', clas_nam: 'Seafood & Grill', isSelect: false },
        { id: '19', clas_nam: 'Bar', isSelect: false },
        { id: '20', clas_nam: 'Tavern', isSelect: false },
    ],

    FoodsServedCategory: [
        { id: '1', clas_nam: 'American', isSelect: false },
        { id: '2', clas_nam: 'Indian', isSelect: false },
        { id: '3', clas_nam: 'Italian', isSelect: false },
        { id: '4', clas_nam: 'Greek', isSelect: false },
        { id: '5', clas_nam: 'Portuguese', isSelect: false },
        { id: '6', clas_nam: 'French', isSelect: false },
        { id: '7', clas_nam: 'German', isSelect: false },
        { id: '8', clas_nam: 'Chinese', isSelect: false },
        { id: '9', clas_nam: 'Korean', isSelect: false },
        { id: '10', clas_nam: 'Japanese', isSelect: false },
        { id: '11', clas_nam: 'Asian', isSelect: false },
        { id: '12', clas_nam: 'Spanish', isSelect: false },
        { id: '13', clas_nam: 'Peruvian', isSelect: false },
        { id: '14', clas_nam: 'Brazilian', isSelect: false },
        { id: '15', clas_nam: 'Columbian', isSelect: false },
        { id: '16', clas_nam: 'Middle-Eastern', isSelect: false },
        { id: '17', clas_nam: 'Lebanese', isSelect: false },
        { id: '18', clas_nam: 'Armenian', isSelect: false },
        { id: '19', clas_nam: 'Turkish', isSelect: false },
        { id: '20', clas_nam: 'Fusion', isSelect: false },
        { id: '21', clas_nam: 'Szechuan', isSelect: false },
        { id: '22', clas_nam: 'Other', isSelect: false },
    ],

    Language_Array: [
        { id: '1', clas_nam: 'Afrikanns', isSelect: false },
        { id: '2', clas_nam: 'Albanian', isSelect: false },
        { id: '3', clas_nam: 'Arabic', isSelect: false },
        { id: '4', clas_nam: 'Armenian', isSelect: false },
        { id: '5', clas_nam: 'Basque', isSelect: false },
        { id: '6', clas_nam: 'Bengali', isSelect: false }, 
        { id: '7', clas_nam: 'Bulgarian', isSelect: false },
        { id: '8', clas_nam: 'Catalan', isSelect: false },
        { id: '9', clas_nam: 'Cambodian', isSelect: false },
        { id: '10', clas_nam: 'Chinese (Mandarin)', isSelect: false },
        { id: '11', clas_nam: 'Croation', isSelect: false },
        { id: '12', clas_nam: 'Czech', isSelect: false },
        { id: '13', clas_nam: 'Danish', isSelect: false },
        { id: '14', clas_nam: 'Dutch', isSelect: false },
        { id: '15', clas_nam: 'English', isSelect: false },
        { id: '16', clas_nam: 'Estonian', isSelect: false },
        { id: '17', clas_nam: 'Fiji', isSelect: false },
        { id: '18', clas_nam: 'Finnish', isSelect: false },
        { id: '19', clas_nam: 'French', isSelect: false },
        { id: '20', clas_nam: 'Georgian', isSelect: false },
        { id: '21', clas_nam: 'German', isSelect: false },
        { id: '22', clas_nam: 'Greek', isSelect: false },
        { id: '23', clas_nam: 'Gujarati', isSelect: false },
        { id: '24', clas_nam: 'Hebrew', isSelect: false },
        { id: '25', clas_nam: 'Hindi', isSelect: false },
        { id: '26', clas_nam: 'Hungarian', isSelect: false },
        { id: '27', clas_nam: 'Icelandic', isSelect: false },
        { id: '28', clas_nam: 'Indonesian', isSelect: false },
        { id: '29', clas_nam: 'Irish', isSelect: false },
        { id: '30', clas_nam: 'Italian', isSelect: false },
        { id: '31', clas_nam: 'Japanese', isSelect: false },
        { id: '32', clas_nam: 'Javanese', isSelect: false },
        { id: '33', clas_nam: 'Korean', isSelect: false },
        { id: '34', clas_nam: 'Latin', isSelect: false },
        { id: '35', clas_nam: 'Latvian', isSelect: false },
        { id: '36', clas_nam: 'Lithuanian', isSelect: false },
        { id: '37', clas_nam: 'Macedonian', isSelect: false },
        { id: '38', clas_nam: 'Malay', isSelect: false },
        { id: '39', clas_nam: 'Malayalam', isSelect: false },
        { id: '40', clas_nam: 'Maltese', isSelect: false },
        { id: '41', clas_nam: 'Maori', isSelect: false },
        { id: '42', clas_nam: 'Marathi', isSelect: false },
        { id: '43', clas_nam: 'Mongolian', isSelect: false },
        { id: '44', clas_nam: 'Nepali', isSelect: false },
        { id: '45', clas_nam: 'Norwegian', isSelect: false },
        { id: '46', clas_nam: 'Persian', isSelect: false },
        { id: '47', clas_nam: 'Polish', isSelect: false },
        { id: '48', clas_nam: 'Portuguese', isSelect: false },
        { id: '49', clas_nam: 'Punjabi', isSelect: false },
        { id: '50', clas_nam: 'Quechua', isSelect: false },
        { id: '51', clas_nam: 'Romanian', isSelect: false },
        { id: '52', clas_nam: 'Russian', isSelect: false },
        { id: '53', clas_nam: 'Samoan', isSelect: false },
        { id: '54', clas_nam: 'Serbian', isSelect: false },
        { id: '55', clas_nam: 'Slovak', isSelect: false },
        { id: '56', clas_nam: 'Slovenian', isSelect: false },
        { id: '57', clas_nam: 'Spanish', isSelect: false },
        { id: '58', clas_nam: 'Swahili', isSelect: false },
        { id: '59', clas_nam: 'Swedish', isSelect: false },
        { id: '60', clas_nam: 'Tamil', isSelect: false },
        { id: '61', clas_nam: 'Tatar', isSelect: false },
        { id: '62', clas_nam: 'Telugu', isSelect: false },
        { id: '63', clas_nam: 'Thai', isSelect: false },
        { id: '64', clas_nam: 'Tibetan', isSelect: false },
    ],

    Skills_Array: [
        { id: '1', clas_nam: 'PHP', isSelect: false },
        { id: '2', clas_nam: 'SQL', isSelect: false },
        { id: '3', clas_nam: 'Day trader', isSelect: false },
        { id: '4', clas_nam: 'Chef', isSelect: false },
        { id: '5', clas_nam: 'Bar Mixologist', isSelect: false },
        { id: '6', clas_nam: 'Butcher', isSelect: false }, 
        { id: '7', clas_nam: 'BANKING', isSelect: false },
        { id: '8', clas_nam: 'HR & admin', isSelect: false },
    ],

    Qualification_Array: [
        { id: '1', clas_nam: 'B-Tech', isSelect: false },
        { id: '2', clas_nam: 'BE', isSelect: false },
        { id: '3', clas_nam: 'BSC', isSelect: false },
        { id: '4', clas_nam: 'BA', isSelect: false },
        { id: '5', clas_nam: 'DOT NET', isSelect: false },
        { id: '6', clas_nam: 'High School', isSelect: false }, 
        { id: '7', clas_nam: 'Trade School', isSelect: false },
        { id: '8', clas_nam: 'College', isSelect: false },
        { id: '9', clas_nam: 'University', isSelect: false },
        { id: '10', clas_nam: 'Su-Chef', isSelect: false },
    ],

    userDetails: [],
    AllSkills_Array: [],
    EQualification_Array: [],
    userImage_Profile: { uri: '' },
    isLoadState: false
};

const friendReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {
                ...state,
                isLoadState: true
            }
        case 'HIDE_LOADER':
            return {
                ...state,
                isLoadState: false
            }
        case 'USER_UPDATE':
            return {
                ...state,
                userDetails: action.payload
            }
        case 'USER_SKILL_UPDATE':
            return {
                ...state,
                AllSkills_Array: action.payload
            }
        case 'USER_EQUALIFICATION_UPDATE':
            return {
                ...state,
                EQualification_Array: action.payload
            }
        case 'USER_IMAGE_UPDATE':
            return {
                ...state,
                userImage_Profile: { uri: action.payload },
            }
        case 'USER_CLASS_UPDATE':
            return Object.assign({}, state, {
                userDetails: state.userDetails.map(todo => {
                    return Object.assign({}, todo, {
                        class_nam: action.payload
                    })
                })
            })
        default:
            return state
    }
};

//export default friendReducer;


export default combineReducers({
    appdata: friendReducer,
});
