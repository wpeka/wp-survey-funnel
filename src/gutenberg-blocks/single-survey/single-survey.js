import AsyncSelect from 'react-select/async';

const {registerBlockType} = wp.blocks;
const apiFetch = wp.apiFetch;
const { Placeholder } = wp.components;
const { __, }       = wp.i18n;

registerBlockType('surveyfunnel/single-survey',{

     title:__('SurveyFunnel Single Survey','surveyfunnel'),
     description: __('Block to generate single survey','surveyfunnel'),
     icon:'flag',
     category:'surveyfunnel-lite',
     attributes:{
      survey_id: {
      type: 'number',
    },
    survey_name: {
      type: 'text',
    },
    survey_embed_type:{
      type:'text',
      default:'responsive'
    },
    survey_custom_width_unit_type:{
      type:'text',
      default:'px'
    },
    survey_custom_height_unit_type:{
      type:'text',
      default:'px'
    },
    survey_custom_width_value:{
      type:'text',
      default:100,
    },
    survey_custom_width:{
      type:'text',
    },
    survey_custom_height_value:{
      type:'text',
      default:100,
    },
    survey_custom_height:{
      type:'text',
    }
    },
     edit(props) {
      const getOptions=(value,callback)=>{

          apiFetch( {
            path:'/wp/v2/wpsf-survey/',
          } )
          .then( ( surveys ) => {
            surveys = surveys.map( ( survey ) => {
              let surveyLabel = survey.title.rendered;
              return {
                        value: survey.id,
                        label: surveyLabel,
                      };
            } );
            callback(surveys);
          } );
      }

      const customStyles = {
        control: (base, state) => ({
          ...base,
      
          minWidth: "300px",
          maxWidth:"400px",
      
      
          fontSize:"125%",
          borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
         
         boxShadow: state.isFocused ? null : null,
      
       }),
        menu: base => ({
          ...base,
      
          borderRadius: 0,
        
          marginTop: 0,
          minWidth: "300px",
        }),
        menuList: base => ({
          ...base,
          padding: 0,
          maxWidth: "300px",
         
        })
      };
      const defaultValue = {
        value: props.attributes.survey_id,
        label: props.attributes.survey_name,
      }
      const onSurveySelection = ( selection ) => {

        props.setAttributes( {
          survey_id   : selection.value,
          survey_name : selection.label,
  
        } );
  
      }
      const onSurveyTypeSelection = (e) =>{
        props.setAttributes({
          survey_embed_type : e.target.value,
        });
      }

      const printUnitOptions =(selected) =>{
        const units = [ 'px', '%', 'em', 'rem'];
        var options_string = '';
        units.forEach(unit=>{
          options_string += `<option value="${unit}" ${selected === unit ? 'selected': ''}>${unit}</option>`;
        });
        return options_string;
      }
      const onHeightUnitChange = (e) =>{
        let height_val = props.attributes.survey_custom_height_value;
        props.setAttributes( {
          survey_custom_height_unit_type : e.target.value,
          survey_custom_height : height_val + ' ' + e.target.value
        } );

      }
      const onWidthUnitChange = (e) =>{

        let width_val = props.attributes.survey_custom_width_value;

        props.setAttributes( {
          survey_custom_width_unit_type : e.target.value,
          survey_custom_width : width_val + ' ' + e.target.value
        } );

      }
      const onWidthChange = (e) =>{

        let width_unit = props.attributes.survey_custom_width_unit_type;
        props.setAttributes( {
          survey_custom_width_value : e.target.value,
          survey_custom_width : e.target.value + ' ' + width_unit
        } );

      }
      const onHeightChange = (e) =>{

        let height_unit = props.attributes.survey_custom_height_unit_type;
        props.setAttributes( {
          survey_custom_height_value : e.target.value,
          survey_custom_height : e.target.value + ' ' + height_unit
        } );

      }

       return <div className="">
       { !! props.isSelected ? (

      <Placeholder label="SurveyFunnel Single Survey"  isColumnLayout="true">

      <h3 style={{fontWeight:"300",textAlign:"center",fontSize:"medium"}}>{__('Select Survey','wpadcenter')}</h3>
      <AsyncSelect
       styles={customStyles}
       className="wpadcenter-async-select"
       defaultOptions
			 loadOptions={ getOptions }
			 defaultValue={ defaultValue }
			 onChange={ onSurveySelection }


      />
      <div>
        <input id="wpsf-responsive-survey" name="survey_embed_type" type="radio" value="reponsive" onChange={onSurveyTypeSelection} checked={props.attributes.survey_embed_type === 'responsive'}></input>
        <label htmlFor="wpsf-responsive-survey">Responsive</label>
        <input id="wpsf-fullpage-survey" name="survey_embed_type" type="radio" value="fullpage" onChange={onSurveyTypeSelection} checked={props.attributes.survey_embed_type === 'fullpage'}></input>
        <label htmlFor="wpsf-fullpage-survey" >Full Page</label>
        <input id="wpsf-custom-survey" name="survey_embed_type" type="radio" value="custom" onChange={onSurveyTypeSelection} checked={props.attributes.survey_embed_type === 'custom'}></input>
        <label htmlFor="wpsf-custom-survey">Custom</label>
      </div>

      { props.attributes.survey_embed_type === 'custom' && (<div>
        <input type="number" id="wpsf_custom_width" value={props.attributes.survey_custom_width_value} onChange={onWidthChange} />
        <label htmlFor="wpsf_custom_width" >Width</label>
        <select  name="survey_custom_width_unit_type" dangerouslySetInnerHTML={{__html:  printUnitOptions(props.attributes.survey_custom_width_unit_type)}} onChange={onWidthUnitChange}>

        </select>
        <input type="number" id="wpsf_custom_height" value={props.attributes.survey_custom_height_value} onChange={onHeightChange} />
        <label htmlFor="wpsf_custom_width">Height</label>
        <select name="survey_custom_height_unit_type" dangerouslySetInnerHTML={{__html:  printUnitOptions(props.attributes.survey_custom_height_unit_type)}} onChange={onHeightUnitChange}>
        </select>
      </div>)}


      </Placeholder>):(
        <h3>Loading.</h3>

      )}

      </div>;

     },

     save(){
       return null;
     }

});