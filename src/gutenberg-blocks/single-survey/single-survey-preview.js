const apiFetch       = wp.apiFetch;
const { Component, } = wp.element;
const { __, }       = wp.i18n;



class SingleSurveyPreview extends Component{
  constructor(){
    super(...arguments);
    this.state={
      survey_id:this.props.surveyId,

      survey_html:{
        __html:'',
      },
    }

  }

  componentDidMount() {
    this.setState( {
      ad_html:{
        __html:`<h4 style="font-weight:300">${__('Loading survey','surveyfunnel')}</h4>`,
      },
    } );
    this.loadAds();

	}

  loadAds(){
   


    var j = jQuery.noConflict();
    j.ajax({
      type:"POST",
      url: "./admin-ajax.php",
      data: {
          action:'wpsf_single_survey_preview', 
          single_survey_nonce:wpsf_single_survey_verify.single_survey_nonce,   
          survey_id:this.props.surveyId,
          survey_type:this.props.surveyType,

      }
  }).done(single_survey_html => {
        this.setState( {
            survey_html:{
            __html:single_survey_html,
        },
    } );
  });


  }


  render() {

    let adAlignment = {
      zIndex:"20",
      position:"relative",
  }; 




return (

  <div style={adAlignment} dangerouslySetInnerHTML={ this.state.survey_html } ></div>
)

  	}
}
export default SingleSurveyPreview;