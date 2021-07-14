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
			<div class="wpsf-button">Button</div>
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
						<input type="text" placeholder="<?php esc_html_e( 'Search By Content Name', 'wp-survey-funnel' ); ?>">
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
				<div class="wpsf-content">
					<div class="wpsf-create-content">
						<h3><?php esc_html_e( 'Create New Content', 'wp-survey-funnel' ); ?></h3>
						<div class="wpsf-create-button">
							<button><span>+</span></button>
						</div>
					</div>
				</div>
				<?php if ( is_array( $surveys ) ) : ?>
					<?php foreach ( $surveys as $survey ) : ?>
						<div class="wpsf-content">
							<div class="wpsf-image-box">
								<div class="wpsf-image">
									<svg xmlns="http://www.w3.org/2000/svg" width="67.491" height="67.49" viewBox="0 0 67.491 67.49">
										<path id="Form_27_copy_2" data-name="Form 27 copy 2" d="M1366.16,773.5a7.8,7.8,0,0,1-8.011-8.007c-.051-.448-.058-1.018-.09-1.506a15.1,15.1,0,0,1-5.117-.975,6.913,6.913,0,0,1-3.5-3.4c-1.377-3-1.182-6.557-1.182-12.38v-24.1a83.678,83.678,0,0,1,.245-8.609,7.8,7.8,0,0,1,8.007-8.012,83.111,83.111,0,0,1,8.618-.249h24.1c1.478,0,2.81-.012,4.025-.009,3.644.007,6.229.156,8.5,1.252a6.923,6.923,0,0,1,3.342,3.652,15.79,15.79,0,0,1,.87,4.9c.492.032,1.065.034,1.516.085a7.8,7.8,0,0,1,8.012,8.007,82.835,82.835,0,0,1,.25,8.618v24.1a83.685,83.685,0,0,1-.245,8.609,7.8,7.8,0,0,1-8.007,8.011,83.108,83.108,0,0,1-8.618.249H1374A75.048,75.048,0,0,1,1366.16,773.5Zm.532-52.56c-1.8.2-2.521.559-2.862.9s-.692,1.066-.895,2.862-.216,4.469-.216,8.073v24.1c0,3.607.014,6.28.216,8.077s.559,2.522.9,2.862,1.066.693,2.862.895,4.469.216,8.073.216h24.1c3.607,0,6.279-.013,8.078-.216s2.521-.558,2.861-.9.693-1.065.895-2.862.217-4.469.217-8.072v-24.1c0-3.607-.014-6.28-.217-8.078s-.558-2.521-.9-2.862-1.065-.693-2.862-.895-4.469-.216-8.072-.216h-24.1C1371.163,720.72,1368.49,720.734,1366.692,720.936Zm-9.64-9.639c-1.8.2-2.522.558-2.862.9s-.693,1.065-.895,2.861-.216,4.469-.216,8.073v24.1c0,5.818.213,9.213.743,10.369a1.493,1.493,0,0,0,1.017.975,11.321,11.321,0,0,0,3.073.551c0-.756-.014-1.409-.014-2.255v-24.1a83.679,83.679,0,0,1,.245-8.609,7.8,7.8,0,0,1,8.007-8.012,83.107,83.107,0,0,1,8.618-.249h24.1c.842,0,1.492.012,2.245.014a12.3,12.3,0,0,0-.5-2.989,1.519,1.519,0,0,0-.96-1.083c-1.111-.537-4.514-.762-10.421-.762h-24.1C1361.523,711.08,1358.85,711.094,1357.052,711.3Zm44.932,49.687-10.36-10.361-3.85,3.794.749.748.064.065a2.41,2.41,0,1,1-3.472,3.344L1383,756.451l-.019-.014a2.416,2.416,0,0,1-.659-.659l-5.14-5.14-5.526,5.526-.065.065a2.41,2.41,0,1,1-3.344-3.473l7.23-7.23a2.411,2.411,0,0,1,1.667-.706h0a2.412,2.412,0,0,1,1.742.706l5.483,5.484,5.583-5.5a2.408,2.408,0,0,1,3.394.014l12.05,12.05c.022.021.044.042.065.065a2.41,2.41,0,0,1-3.473,3.343Zm-7.935-28.214a4.82,4.82,0,1,1,4.82,4.819A4.82,4.82,0,0,1,1394.05,732.77Z" transform="translate(-1348.25 -706.25)" fill="#f0f2f5"/>
									</svg>
								</div>

								<div class="--wpsf-flex wpsf-post-status">
									<div class="wpsf-badge"><?php echo $survey->post_status; //phpcs:ignore ?></div>
									<div class="--wpsf-flex wpsf-post-icons">
										<div class="icon">1</div>
										<div class="icon">2</div>
										<div class="icon">3</div>
									</div>
								</div>
							</div>
							<div class="wpsf-title-box --wpsf-flex">
								<div class="wpsf-title"><?php echo $survey->post_title; //phpcs:ignore ?></div>
								<div class="wpsf-badge wpsf-badge-sm wpsf-badge-survey-type">
									Outcome
								</div>
							</div>
							<div class="wpsf-content-stats --wpsf-flex">
								<div class="wpsf-stat-box wpsf-views">
									<p>2</p>
									<small>views</small>
								</div>
								<div class="wpsf-stat-box wpsf-contacts">
									<p>2</p>
									<small>contacts</small>
								</div>
								<div class="wpsf-stat-box wpsf-completion-rate">
									<p>100%</p>
									<small>completion rate</small>
								</div>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
