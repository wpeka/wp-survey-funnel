<?php

$args = array(
	'post_type'   => 'wpsf-survey',
	'numberposts' => -1,
);

$surveys = get_posts( $args );

$disabled = Wp_Survey_Funnel::check_pro_activated() ? '' : 'disabled="disabled"';

?>
<div class="wpsf-container-fluid">
	<div class="wpsf-navbar">
		<div class="wpsf-container wpsf-top-navbar --wpsf-flex">
			<div class="wpsf-logo">SurveyFunnel</div>
		</div>
	</div>
	<div class="wpsf-body">
		<div class="wpsf-container">
			<div class="wpsf-dashboard-container --wpsf-flex">
				<div class="wpsf-left">
					<span><?php esc_html_e( 'DASHBOARD', 'wp-survey-funnel' ); ?></span>
				</div>
				<div class="wpsf-right --wpsf-flex">
					<div class="wpsf-search">
						<input type="text" data-search placeholder="<?php esc_html_e( 'Search By Content Name', 'wp-survey-funnel' ); ?>">
					</div>
					<div class="wpsf-filter">
						<label for="wpsf-filter"><?php esc_html_e( 'Filter By:' ); ?></label>
						<select <?php echo $disabled; //phpcs:ignore ?> id="wpsf-filter">
							<option value="all-types"><?php esc_html_e( 'All Types' ); ?></option>
							<option value="all-types"><?php esc_html_e( 'Scoring Logic' ); ?></option>
							<option value="all-types"><?php esc_html_e( 'Outcome Logic' ); ?></option>
						</select>
					</div>
				</div>
			</div>

			<div class="wpsf-card-container">
				<div class="wpsf-content" style="cursor: pointer;">
					<div class="wpsf-create-content">
						<h3><?php esc_html_e( 'Create New Content', 'wp-survey-funnel' ); ?></h3>
						<div class="wpsf-create-button">
							<button><span>+</span></button>
						</div>
					</div>
				</div>
				<?php if ( is_array( $surveys ) ) : ?>
					<?php foreach ( $surveys as $survey ) : ?>
						<div class="wpsf-content" data-filter-item data-filter-name="<?php echo esc_html( $survey->post_title ); ?>">
							<div class="wpsf-image-box">
								<div class="wpsf-image">
									<svg xmlns="http://www.w3.org/2000/svg" width="67.491" height="67.49" viewBox="0 0 67.491 67.49">
										<path id="Form_27_copy_2" data-name="Form 27 copy 2" d="M1366.16,773.5a7.8,7.8,0,0,1-8.011-8.007c-.051-.448-.058-1.018-.09-1.506a15.1,15.1,0,0,1-5.117-.975,6.913,6.913,0,0,1-3.5-3.4c-1.377-3-1.182-6.557-1.182-12.38v-24.1a83.678,83.678,0,0,1,.245-8.609,7.8,7.8,0,0,1,8.007-8.012,83.111,83.111,0,0,1,8.618-.249h24.1c1.478,0,2.81-.012,4.025-.009,3.644.007,6.229.156,8.5,1.252a6.923,6.923,0,0,1,3.342,3.652,15.79,15.79,0,0,1,.87,4.9c.492.032,1.065.034,1.516.085a7.8,7.8,0,0,1,8.012,8.007,82.835,82.835,0,0,1,.25,8.618v24.1a83.685,83.685,0,0,1-.245,8.609,7.8,7.8,0,0,1-8.007,8.011,83.108,83.108,0,0,1-8.618.249H1374A75.048,75.048,0,0,1,1366.16,773.5Zm.532-52.56c-1.8.2-2.521.559-2.862.9s-.692,1.066-.895,2.862-.216,4.469-.216,8.073v24.1c0,3.607.014,6.28.216,8.077s.559,2.522.9,2.862,1.066.693,2.862.895,4.469.216,8.073.216h24.1c3.607,0,6.279-.013,8.078-.216s2.521-.558,2.861-.9.693-1.065.895-2.862.217-4.469.217-8.072v-24.1c0-3.607-.014-6.28-.217-8.078s-.558-2.521-.9-2.862-1.065-.693-2.862-.895-4.469-.216-8.072-.216h-24.1C1371.163,720.72,1368.49,720.734,1366.692,720.936Zm-9.64-9.639c-1.8.2-2.522.558-2.862.9s-.693,1.065-.895,2.861-.216,4.469-.216,8.073v24.1c0,5.818.213,9.213.743,10.369a1.493,1.493,0,0,0,1.017.975,11.321,11.321,0,0,0,3.073.551c0-.756-.014-1.409-.014-2.255v-24.1a83.679,83.679,0,0,1,.245-8.609,7.8,7.8,0,0,1,8.007-8.012,83.107,83.107,0,0,1,8.618-.249h24.1c.842,0,1.492.012,2.245.014a12.3,12.3,0,0,0-.5-2.989,1.519,1.519,0,0,0-.96-1.083c-1.111-.537-4.514-.762-10.421-.762h-24.1C1361.523,711.08,1358.85,711.094,1357.052,711.3Zm44.932,49.687-10.36-10.361-3.85,3.794.749.748.064.065a2.41,2.41,0,1,1-3.472,3.344L1383,756.451l-.019-.014a2.416,2.416,0,0,1-.659-.659l-5.14-5.14-5.526,5.526-.065.065a2.41,2.41,0,1,1-3.344-3.473l7.23-7.23a2.411,2.411,0,0,1,1.667-.706h0a2.412,2.412,0,0,1,1.742.706l5.483,5.484,5.583-5.5a2.408,2.408,0,0,1,3.394.014l12.05,12.05c.022.021.044.042.065.065a2.41,2.41,0,0,1-3.473,3.343Zm-7.935-28.214a4.82,4.82,0,1,1,4.82,4.819A4.82,4.82,0,0,1,1394.05,732.77Z" transform="translate(-1348.25 -706.25)" fill="#f0f2f5"/>
									</svg>
								</div>
								<div class="wpsf-post-status">
									<div class="wpsf-post-status">
										<div class="wpsf-post-status-inside --wpsf-flex">
											<div class="wpsf-badge wpsf-badge-published"><?php echo "Published"; //phpcs:ignore ?></div>
											<div class="--wpsf-flex wpsf-post-icons">
												<div class="icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="13.224" height="13.225" viewBox="0 0 13.224 13.225">
														<path id="Form_24" data-name="Form 24" d="M1011.154,290.062a2.424,2.424,0,0,1-2.523-2.518,28.6,28.6,0,0,1-.087-2.992,29.476,29.476,0,0,1,.085-2.991,2.415,2.415,0,0,1,2.517-2.519,29.256,29.256,0,0,1,2.993-.085h.014a.509.509,0,0,1-.014,1.017c-1.269,0-2.214,0-2.879.078a1.452,1.452,0,0,0-1.621,1.623c-.075.665-.077,1.609-.077,2.876s0,2.211.08,2.876a1.457,1.457,0,0,0,1.626,1.623c.664.076,1.607.079,2.871.079s2.207,0,2.871-.08a1.459,1.459,0,0,0,1.626-1.625c.076-.665.08-1.608.08-2.874v-.014a.509.509,0,0,1,1.017.014,28.788,28.788,0,0,1-.087,2.989,2.424,2.424,0,0,1-2.522,2.52,52.163,52.163,0,0,1-5.971,0Zm2.477-4.493a.509.509,0,0,1-.509-.508v-1.526a.511.511,0,0,1,.149-.359l6.1-6.1a.507.507,0,0,1,.719,0l1.526,1.525a.509.509,0,0,1,0,.72l-6.1,6.1a.511.511,0,0,1-.36.149Zm.508-1.824v.806h.806l4.069-4.069-.806-.806Zm4.788-4.788.806.806.806-.806-.806-.806Z" transform="translate(-1008.544 -276.922)" fill="#fff"/>
													</svg>
												</div>
												<div class="icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="12.77" height="12.77" viewBox="0 0 12.77 12.77">
														<path id="Form_27" data-name="Form 27" d="M1038.171,290.556a1.475,1.475,0,0,1-1.516-1.515c-.009-.085-.011-.193-.017-.285a2.839,2.839,0,0,1-.968-.185,1.308,1.308,0,0,1-.663-.643,5.869,5.869,0,0,1-.223-2.343v-4.559a15.93,15.93,0,0,1,.046-1.629,1.475,1.475,0,0,1,1.516-1.516,15.665,15.665,0,0,1,1.631-.047h4.559c.28,0,.532,0,.762,0a3.646,3.646,0,0,1,1.607.237,1.311,1.311,0,0,1,.632.691,2.984,2.984,0,0,1,.165.928c.094.006.2.006.287.016a1.475,1.475,0,0,1,1.516,1.515,15.645,15.645,0,0,1,.048,1.631v4.56a15.654,15.654,0,0,1-.047,1.629,1.475,1.475,0,0,1-1.515,1.516,15.648,15.648,0,0,1-1.631.048h-4.7A14.1,14.1,0,0,1,1038.171,290.556Zm.1-9.945a.612.612,0,0,0-.71.712c-.039.34-.041.846-.041,1.527v4.56c0,.682,0,1.188.041,1.528a.612.612,0,0,0,.711.711c.34.038.846.04,1.527.04h4.56c.682,0,1.188,0,1.528-.04a.612.612,0,0,0,.711-.712c.038-.34.041-.846.041-1.527v-4.56c0-.682,0-1.188-.041-1.528a.613.613,0,0,0-.712-.711c-.34-.038-.845-.04-1.527-.04h-4.56C1039.118,280.57,1038.612,280.573,1038.271,280.611Zm-1.823-1.823a.612.612,0,0,0-.711.711c-.039.34-.042.846-.042,1.528v4.559a7.035,7.035,0,0,0,.141,1.962.28.28,0,0,0,.192.184,2.136,2.136,0,0,0,.582.1c0-.143,0-.266,0-.427v-4.56a15.974,15.974,0,0,1,.046-1.629,1.475,1.475,0,0,1,1.515-1.516,15.645,15.645,0,0,1,1.631-.048h4.56c.159,0,.283,0,.425,0a2.321,2.321,0,0,0-.1-.565.288.288,0,0,0-.182-.205,6.949,6.949,0,0,0-1.972-.144h-4.559C1037.293,278.746,1036.787,278.749,1036.448,278.788Zm8.5,9.4-1.96-1.96-.729.717.142.142.012.012a.456.456,0,1,1-.657.633l-.4-.4,0,0a.445.445,0,0,1-.124-.125l-.973-.972-1.046,1.045-.013.013a.456.456,0,0,1-.632-.657l1.368-1.368a.454.454,0,0,1,.315-.133h0a.457.457,0,0,1,.329.134l1.038,1.038,1.057-1.04a.454.454,0,0,1,.642,0l2.28,2.28.013.013a.456.456,0,0,1-.657.633Zm-1.5-5.339a.91.91,0,1,1,.91.91A.91.91,0,0,1,1043.45,282.85Z" transform="translate(-1034.782 -277.833)" fill="#fff"/>
													</svg>
												</div>
												<div class="icon">
													<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14" viewBox="0 0 14 14">
														<image id="bar-chart-hover" width="14" height="14" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAVtJREFUKFON0ksoRFEcx3HXRh4jsmEsJDWShYYyxWZSliKSJTsLQlmIUlhSyk6N10qxEGbKirAjSXkkSsmChQUpkef3V/9bJ92FW5/+53H/53/uOdebX0ml/fMp5b1dvKHeC0gMMxHDJr6cRaton1g/EpR4wGQthjDpJG7QDmEaqb+JXQwu4h3fVvmUuIQ6RPyFlJhDZ8EGs4mduEQzJvCIcqum+Sw8KFEffWMrxYl7zvZmaXdjDcM4xw+i/lb76RRgDC0owjGu0IdlFGPbFo0FHc4rk5nQPTU51dtpr1q/2k/MYMCD7ugCFRi1qjpdVTrElpuob9QVpKMNA7bdXqK2P44ji0k3MWora6wDrRYHiZ+YgRIS0E+hp0ZbraRxZgM6mB40YgQfmMI+dPHrbsU8OrozPTsoQwm0Pf0E+ovucI0Gey+pinN0XmxACU94RiF0YPfIRT5u7b3QL0bfYPme+GX6AAAAAElFTkSuQmCC"/>
													</svg>
												</div>
												<div class="icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="9.126" height="12.775" viewBox="0 0 9.126 12.775">
														<path id="Form_13" data-name="Form 13" d="M1094.56,289.691h-2.736a15.939,15.939,0,0,1-1.629-.046,1.475,1.475,0,0,1-1.516-1.516,15.91,15.91,0,0,1-.047-1.63v-6.385a15.939,15.939,0,0,1,.046-1.629,1.475,1.475,0,0,1,1.516-1.516,15.636,15.636,0,0,1,1.631-.048h2.663a.4.4,0,0,1,.066-.005.428.428,0,0,1,.1.008,2.192,2.192,0,0,1,1.031.163,8.7,8.7,0,0,1,1.908,1.911,2.164,2.164,0,0,1,.162,1.028.423.423,0,0,1,0,.165V286.5a15.649,15.649,0,0,1-.047,1.629,1.475,1.475,0,0,1-1.516,1.516,15.078,15.078,0,0,1-1.555.047Zm-4.265-11.816a.612.612,0,0,0-.71.712c-.039.34-.042.846-.042,1.527V286.5c0,.683,0,1.189.042,1.529a.612.612,0,0,0,.712.71c.339.039.845.041,1.527.041h2.767c.663,0,1.162,0,1.5-.041a.613.613,0,0,0,.711-.71c.039-.34.041-.846.041-1.529V280.57h-2.28a.456.456,0,0,1-.456-.456v-2.28h-2.28C1091.141,277.835,1090.635,277.837,1090.3,277.875Zm4.72,1.783h1.813a.676.676,0,0,0-.058-.252,9.722,9.722,0,0,0-1.5-1.5.656.656,0,0,0-.254-.058Zm.456,7.753H1090.9a.456.456,0,0,1,.013-.913h4.572a.456.456,0,0,1-.006.913Zm0-1.824H1090.9a.456.456,0,0,1,.013-.912h4.572a.456.456,0,0,1-.006.912Zm-4.573-1.824a.456.456,0,0,1,.013-.912h4.572a.456.456,0,1,1-.013.912H1090.9Z" transform="translate(-1088.632 -276.916)" fill="#fff"/>
													</svg>
												</div>
												<div class="icon">
													<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12" viewBox="0 0 12 12">
														<image id="share" width="12" height="12" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAANJJREFUKFNj/P//PwMewAaUWwrETkB8AIiTGQloCAEqWo1k4DR8GriACi8DsRKShunIGtiBEj+hkrVAuhSIdwDxNyAOgDopEaSBD8iZB8R2QLwTiCWBWAuIy4F4MdQAHiD9BcQGaZgGpDORrF0HZAfjCgiQhplAyTQkBWuBbJBnsQKQBgGgzHwgdgDi7VAnqQDpMiBeDtXFCaS/w5wEM4kbyPgK5TQC6UIg3goVA3n6IBDjjQdeoIJLQKyA5LappEYcSjxg8yQoblYAMSjIDwNxIgAOuESAZA8BnAAAAABJRU5ErkJggg=="/>
													</svg>
												</div>
												<div class="icon">
													<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="3" height="13" viewBox="0 0 3 13">
														<image id="more-options" width="3" height="13" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAANCAYAAABsItTPAAAABHNCSVQICAgIfAhkiAAAAD5JREFUCFtj/P//fwsDA0MqEC9gBHL+AxlgAOKkAekkIF4M4sAkwDIoHJABiUC8hFwDEoCak4F4EYYBnTCjAWegMr8vTcqkAAAAAElFTkSuQmCC"/>
													</svg>
												</div>
											</div>
										</div>
									</div>
								</div> 
							</div>
							<div class="wpsf-title-box --wpsf-flex">
								<div class="wpsf-title"><?php echo $survey->post_title; //phpcs:ignore ?></div>
								<div class="wpsf-badge wpsf-badge-sm wpsf-badge-outcome wpsf-badge-survey-type">
									<small>outcome</small>
								</div>
							</div>
							<div class="wpsf-content-stats --wpsf-grid">
								<div class="wpsf-stat-box wpsf-views">
									<div class="wpsf-stat">
										<span>2</span>
										<small><?php esc_html_e( 'Views', 'wp-survey-funnel' ); ?></small>
									</div>
								</div>
								<div class="wpsf-stat-box wpsf-contacts">
									<div class="wpsf-stat">
										<span>2</span>
										<small><?php esc_html_e( 'Contacts', 'wp-survey-funnel' ); ?></small>
									</div>
								</div>
								<div class="wpsf-stat-box wpsf-completion-rate">
									<div class="wpsf-stat">
										<span>100%</span>
										<small><?php esc_html_e( 'Compl. Rate', 'wp-survey-funnel' ); ?></small>
									</div>
								</div>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
