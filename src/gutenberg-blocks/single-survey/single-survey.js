import AsyncSelect from 'react-select/async';

const {registerBlockType} = wp.blocks;
const apiFetch = wp.apiFetch;
const { Placeholder } = wp.components;
const { __, }       = wp.i18n;

import SingleSurveyIcon from './single-survey-icon.js';

registerBlockType('surveyfunnel/single-survey',{

     title:__('SurveyFunnel Single Survey','surveyfunnel'),
     description: __('Block to generate single survey','surveyfunnel'),
     icon: SingleSurveyIcon,
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
      default:'%'
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
      default:700,
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
          maxWidth:"547px",
      
      
          fontSize:"125%",
          borderRadius: "9px",
          padding:"10px",
         
         boxShadow: state.isFocused ? null : null,
      
       }),
        menu: base => ({
          ...base,
      
          borderRadius: 0,
        
          marginTop: 0,
          minWidth: "300px",
          borderRadius:"9px"

        }),
        menuList: base => ({
          ...base,
          padding: 0,
          maxWidth: "547px",
          borderRadius:"9px"
         
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
          survey_custom_height : height_val + e.target.value
        } );

      }
      const onWidthUnitChange = (e) =>{

        let width_val = props.attributes.survey_custom_width_value;

        props.setAttributes( {
          survey_custom_width_unit_type : e.target.value,
          survey_custom_width : width_val + e.target.value
        } );

      }
      const onWidthChange = (e) =>{

        let width_unit = props.attributes.survey_custom_width_unit_type;
        props.setAttributes( {
          survey_custom_width_value : e.target.value,
          survey_custom_width : e.target.value + width_unit
        } );

      }
      const onHeightChange = (e) =>{

        let height_unit = props.attributes.survey_custom_height_unit_type;
        props.setAttributes( {
          survey_custom_height_value : e.target.value,
          survey_custom_height : e.target.value + height_unit
        } );

      }

      const surveyTypes = {
        responsive: __('Responsive','surveyfunnel'),
        fullpage:__('Fullpage','surveyfunnel'),
        custom:__('Custom','surveyfunnel')
      }

       return <div className="surveyfunnel-lite-gutenberg-block-container">
       { !! props.isSelected ? (

      <Placeholder  isColumnLayout="true">
      <div className="surveyfunnel-lite-gutenberg-block-component-area">

          <div className="surveyfunnel-lite-gutenberg-heading">
            <h3 style={{fontSize:"24px",margin:"38px 0",fontWeight:"bold"}}>{__('SurveyFunnel Single Survey','surveyfunnel')}</h3>
          </div>

          <h4 style={{fontSize:"18px",margin:"0 0 20px 0",fontWeight:"bold"}}>{__('Select Survey','surveyfunnel')}</h4>
          <AsyncSelect
          styles={customStyles}
          className="surveyfunnel-lite-async-select"
          defaultOptions
          loadOptions={ getOptions }
          defaultValue={ defaultValue }
          onChange={ onSurveySelection }


          />
          <h4 style={{fontSize:"18px", margin:"38px 0 20px 0",fontWeight:"bold"}}>{__('Survey Embed Type','surveyfunnel')}</h4>
          <div className="surveyfunnel-lite-contentTypes-container">
            <div className={props.attributes.survey_embed_type === 'responsive' ? 'surveyfunnel-lite-contentType-element surveyfunnel-lite-contentType-element-active':'surveyfunnel-lite-contentType-element'}>
              <label htmlFor="surveyfunnel-lite-responsive-survey">{__('Responsive','surveyfunnel')}</label>
              <input id="surveyfunnel-lite-responsive-survey" name="survey_embed_type" type="radio" value="responsive" onChange={onSurveyTypeSelection} checked={props.attributes.survey_embed_type === 'responsive'}></input>
            </div>
            <div className={props.attributes.survey_embed_type === 'fullpage' ? 'surveyfunnel-lite-contentType-element surveyfunnel-lite-contentType-element-active':'surveyfunnel-lite-contentType-element'}>
              <label htmlFor="surveyfunnel-lite-fullpage-survey" >{__('Full Page','surveyfunnel')}</label>
              <input id="surveyfunnel-lite-fullpage-survey" name="survey_embed_type" type="radio" value="fullpage" onChange={onSurveyTypeSelection} checked={props.attributes.survey_embed_type === 'fullpage'}></input>
            </div>
            <div className={props.attributes.survey_embed_type === 'custom' ? 'surveyfunnel-lite-contentType-element surveyfunnel-lite-contentType-element-active':'surveyfunnel-lite-contentType-element'}>
              <label htmlFor="surveyfunnel-lite-custom-survey">{__('Custom','surveyfunnel')}</label>
              <input id="surveyfunnel-lite-custom-survey" name="survey_embed_type" type="radio" value="custom" onChange={onSurveyTypeSelection} checked={props.attributes.survey_embed_type === 'custom'}></input>
            </div>
          </div>

          { props.attributes.survey_embed_type === 'custom' && (<div className="surveyfunnel-lite-gutenberg-custom-options-main">
            <div className="surveyfunnel-lite-gutenberg-custom-options-container">
              <div className="surveyfunnel-lite-gutenberg-custom-options">
                <label htmlFor="surveyfunnel-lite_custom_width" >{__('Width','surveyfunnel')}</label>
                <input type="number" id="surveyfunnel-lite_custom_width" value={props.attributes.survey_custom_width_value} onChange={onWidthChange} />
                <select  name="survey_custom_width_unit_type" dangerouslySetInnerHTML={{__html:  printUnitOptions(props.attributes.survey_custom_width_unit_type)}} onChange={onWidthUnitChange}>
                </select>

              </div>
              <div className="surveyfunnel-lite-gutenberg-custom-options">
                <label htmlFor="surveyfunnel-lite_custom_width">{__('Height','surveyfunnel')}</label>
                <input type="number" id="surveyfunnel-lite_custom_height" value={props.attributes.survey_custom_height_value} onChange={onHeightChange} />
                <select name="survey_custom_height_unit_type" dangerouslySetInnerHTML={{__html:  printUnitOptions(props.attributes.survey_custom_height_unit_type)}} onChange={onHeightUnitChange}>
                </select>
              </div>
            </div>
          </div>)}

      </div>
      </Placeholder>):(
        <div className="surveyfunnel-lite-gutenberg-preview-box">
          {props.attributes.survey_id ? 
            <p style={{fontSize:"18px",fontWeight:"normal",margin:"0px"}}>{surveyTypes[props.attributes.survey_embed_type]}{__(' survey has been added. Click on this box to edit. Preview for survey will be available on live or preview page.','surveyfunnel')} </p>
            :
            <p style={{fontSize:"18px",fontWeight:"normal",margin:"0px"}}>{__('No survey selected. Click on this box to edit.','surveyfunnel')}</p>
          }
        </div>

      )}

      </div>;

     },

     save(){
       return null;
     }

});