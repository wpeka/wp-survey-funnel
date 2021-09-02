<?php
/**
 * Admin Dashboard page.
 *
 * @link  https://club.wpeka.com
 * @since 1.0.0
 *
 * @package Surveyfunnel_Lite
 */
$args = array(
	'post_type'   => 'wpsf-survey',
	'post_status' => array( 'draft', 'publish' ),
	'numberposts' => -1,
);

$surveys = get_posts( $args );

$disabled = Surveyfunnel_Lite::check_pro_activated() ? '' : 'disabled="disabled"';

$url_to_redirect = Surveyfunnel_Lite_Admin::surveyfunnel_lite_get_setup_page_url();

/**
 * Gets background image stored for the particular survey.
 *
 * @param int $post_id post id/survey id.
 */
function surveyfunnel_lite_get_background_image( $post_id ) {
	$id = get_post_meta( $post_id, 'surveyfunnel-lite-design-background', true );
	if ( $id ) {
		return wp_get_attachment_url( $id );
	}
	return false;
}

?>
<div class="surveyfunnel-lite-container-fluid" id="surveyfunnel-lite-dashboard">
	<div class="surveyfunnel-lite-modal">
		<div class="surveyfunnel-lite-modal-dialog">
			<div class="surveyfunnel-lite-modal-dialog-navbar">
				<span class="surveyfunnel-lite-dismiss">✕</span>
			</div>
			<div class="surveyfunnel-lite-modal-inner">
				<span class="content-info-title"><?php esc_html_e( 'Select Survey Type', 'surveyfunnel' ); ?></span>
				<div class="select-content-type">
					<div class="surveyfunnel-lite-modal-content-card">
						<div class="card-image">
						<div class="surveyfunnel-lite-content-type-radios">
							<input id="surveyfunnel-lite-basic-radio" type="radio" name="content-type" value="basic" checked>
							<label for="surveyfunnel-lite-basic-radio">
								<span>
									<img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'admin-images/checkmark.png' ); ?>" alt="Checked Icon" />
								</span>
							</label>
						</div>
						<div class="surveyfunnel-lite-content-type-icon" >
							<img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'admin-images/basic-survey.png' ); ?>">
						</div>
						</div>
						<div class="card-title">
							<?php esc_html_e( 'Simple Survey', 'surveyfunnel' ); ?>
						</div>
						<div class="card-text">
							<?php esc_html_e( 'Create a linear survey. Respondents receive results when they complete the survey.', 'surveyfunnel' ); ?>
						</div>
					</div>
					<div class="surveyfunnel-lite-modal-content-card  <?php echo $disabled ? 'surveyfunnel-lite-modal-content-card-disabled' : ''; ?>">
						<div class="card-image">
						<div class="surveyfunnel-lite-content-type-radios">
    						<input <?php echo esc_attr( $disabled ); ?> id="surveyfunnel-lite-outcome-radio" type="radio" name="content-type" value="outcome">
							<label for="surveyfunnel-lite-outcome-radio">
								<span>
									<img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'admin-images/checkmark.png' ); ?>" alt="Checked Icon" />
								</span>
							</label>
						</div>
						<div class="surveyfunnel-lite-content-type-icon" >
							<img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'admin-images/outcome-logic.png' ); ?>">
						</div>
						</div>
						<div class="card-title">
							<?php esc_html_e( 'Outcome Logic', 'surveyfunnel' ); ?>
						</div>
						<div class="card-text">
							<?php esc_html_e( 'Map answers to outcomes. Respondents receive results based on the outcome with the most answers selected.', 'surveyfunnel' ); ?>
						</div>
					</div>
					<div class="surveyfunnel-lite-modal-content-card  <?php echo $disabled ? 'surveyfunnel-lite-modal-content-card-disabled' : ''; ?>">
						<div class="card-image">
						<div class="surveyfunnel-lite-content-type-radios">
    						<input <?php echo esc_attr( $disabled ); ?> id="surveyfunnel-lite-scoring-radio" type="radio" name="content-type" value="scoring">
							<label for="surveyfunnel-lite-scoring-radio">
								<span>
									<img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'admin-images/checkmark.png' ); ?>" alt="Checked Icon" />
								</span>
							</label>
						</div>
						<div class="surveyfunnel-lite-content-type-icon" >
							<img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'admin-images/scoring-logic.png' ); ?>">
						</div>
						</div>
						<div class="card-title">
							<?php esc_html_e( 'Scoring Logic', 'surveyfunnel' ); ?>
						</div>
						<div class="card-text">
							<?php esc_html_e( 'Assign a score value to each answer. Respondents receive results based on their score range.', 'surveyfunnel' ); ?>
						</div>
					</div>
				</div>
				<div class="set-content-name">
					<span class="content-info-title"><?php esc_html_e( 'Enter Survey Name', 'surveyfunnel' ); ?></span>
					<input type="text" id="content-title" placeholder="Enter Title">
					<button type="submit" id="surveyfunnel-lite-modal-submit">Continue</button>
				</div>
			</div>
		</div>
	</div>
	<div class="surveyfunnel-lite-navbar-container">
		<div class="surveyfunnel-lite-navbar">
			<div class="surveyfunnel-lite-container-navbar surveyfunnel-lite-top-navbar --surveyfunnel-lite-flex">
				<div class="surveyfunnel-lite-logo">
					<img src="<?php echo esc_url( SURVEYFUNNEL_LITE_PLUGIN_URL . 'images/surveyfunnel-lite-main-logo.png' ); ?>" alt="<?php echo esc_html( 'Survey Funnel Lite Logo' ); ?>">
				</div>
			</div>
		</div>
	</div>
	<div class="surveyfunnel-lite-body">
		<div class="surveyfunnel-lite-container">
			<div class="surveyfunnel-lite-dashboard-container">
				<div class="surveyfunnel-lite-left">
					<span><?php esc_html_e( 'DASHBOARD', 'surveyfunnel' ); ?></span>
				</div>
				<div class="surveyfunnel-lite-filter surveyfunnel-lite-right">
					<label for="surveyfunnel-lite-filter"><?php esc_html_e( 'Filter By:', 'surveyfunnel' ); ?></label>
					<select <?php echo esc_attr( $disabled ); ?> id="surveyfunnel-lite-filter">

						<option value="all-types"><?php esc_html_e( 'All Types', 'surveyfunnel' ); ?></option>
						<option value="all-types"><?php esc_html_e( 'Scoring Logic', 'surveyfunnel' ); ?></option>
						<option value="all-types"><?php esc_html_e( 'Outcome Logic', 'surveyfunnel' ); ?></option>
					</select>
				</div>
				<div class="surveyfunnel-lite-search surveyfunnel-lite-right">
					<input class="surveyfunnel-lite-dashboard-search" type="text" data-search placeholder="<?php esc_html_e( 'Search By Content Name', 'surveyfunnel' ); ?>">
				</div>
			</div>
			<div class="surveyfunnel-lite-card-container">
				<div class="surveyfunnel-lite-content" style="cursor: pointer;">
					<div class="surveyfunnel-lite-create-content">
						<h3><?php esc_html_e( 'Create New Survey', 'surveyfunnel' ); ?></h3>
						<div class="surveyfunnel-lite-create-button">
							<button><span>+</span></button>
						</div>
					</div>
				</div>
				<?php if ( is_array( $surveys ) ) : ?>
					<?php foreach ( $surveys as $survey ) : ?>
						<?php $data = Surveyfunnel_Lite_Admin::surveyfunnel_lite_get_insights_data( $survey->ID ); ?>
						<?php $url  = surveyfunnel_lite_get_background_image( $survey->ID ); ?>
						<div class="surveyfunnel-lite-content" data-filter-item data-filter-name="<?php echo esc_html( strtolower( $survey->post_title ) ); ?>">
							<div class="surveyfunnel-lite-image-box">
								<div class="surveyfunnel-lite-image">
									<?php if ( $url ) : ?>
										<img src="<?php echo esc_url( $url ); ?>" alt="survey-background-image">
									<?php else : ?>
									<svg xmlns="http://www.w3.org/2000/svg" width="67.491" height="67.49" viewBox="0 0 67.491 67.49">
										<path id="Form_27_copy_2" data-name="Form 27 copy 2" d="M1366.16,773.5a7.8,7.8,0,0,1-8.011-8.007c-.051-.448-.058-1.018-.09-1.506a15.1,15.1,0,0,1-5.117-.975,6.913,6.913,0,0,1-3.5-3.4c-1.377-3-1.182-6.557-1.182-12.38v-24.1a83.678,83.678,0,0,1,.245-8.609,7.8,7.8,0,0,1,8.007-8.012,83.111,83.111,0,0,1,8.618-.249h24.1c1.478,0,2.81-.012,4.025-.009,3.644.007,6.229.156,8.5,1.252a6.923,6.923,0,0,1,3.342,3.652,15.79,15.79,0,0,1,.87,4.9c.492.032,1.065.034,1.516.085a7.8,7.8,0,0,1,8.012,8.007,82.835,82.835,0,0,1,.25,8.618v24.1a83.685,83.685,0,0,1-.245,8.609,7.8,7.8,0,0,1-8.007,8.011,83.108,83.108,0,0,1-8.618.249H1374A75.048,75.048,0,0,1,1366.16,773.5Zm.532-52.56c-1.8.2-2.521.559-2.862.9s-.692,1.066-.895,2.862-.216,4.469-.216,8.073v24.1c0,3.607.014,6.28.216,8.077s.559,2.522.9,2.862,1.066.693,2.862.895,4.469.216,8.073.216h24.1c3.607,0,6.279-.013,8.078-.216s2.521-.558,2.861-.9.693-1.065.895-2.862.217-4.469.217-8.072v-24.1c0-3.607-.014-6.28-.217-8.078s-.558-2.521-.9-2.862-1.065-.693-2.862-.895-4.469-.216-8.072-.216h-24.1C1371.163,720.72,1368.49,720.734,1366.692,720.936Zm-9.64-9.639c-1.8.2-2.522.558-2.862.9s-.693,1.065-.895,2.861-.216,4.469-.216,8.073v24.1c0,5.818.213,9.213.743,10.369a1.493,1.493,0,0,0,1.017.975,11.321,11.321,0,0,0,3.073.551c0-.756-.014-1.409-.014-2.255v-24.1a83.679,83.679,0,0,1,.245-8.609,7.8,7.8,0,0,1,8.007-8.012,83.107,83.107,0,0,1,8.618-.249h24.1c.842,0,1.492.012,2.245.014a12.3,12.3,0,0,0-.5-2.989,1.519,1.519,0,0,0-.96-1.083c-1.111-.537-4.514-.762-10.421-.762h-24.1C1361.523,711.08,1358.85,711.094,1357.052,711.3Zm44.932,49.687-10.36-10.361-3.85,3.794.749.748.064.065a2.41,2.41,0,1,1-3.472,3.344L1383,756.451l-.019-.014a2.416,2.416,0,0,1-.659-.659l-5.14-5.14-5.526,5.526-.065.065a2.41,2.41,0,1,1-3.344-3.473l7.23-7.23a2.411,2.411,0,0,1,1.667-.706h0a2.412,2.412,0,0,1,1.742.706l5.483,5.484,5.583-5.5a2.408,2.408,0,0,1,3.394.014l12.05,12.05c.022.021.044.042.065.065a2.41,2.41,0,0,1-3.473,3.343Zm-7.935-28.214a4.82,4.82,0,1,1,4.82,4.819A4.82,4.82,0,0,1,1394.05,732.77Z" transform="translate(-1348.25 -706.25)" fill="#f0f2f5"/>
									</svg>
									<?php endif; ?>
								</div>
								<div class="surveyfunnel-lite-post-status">
									<div class="surveyfunnel-lite-post-status">
										<div class="surveyfunnel-lite-post-status-inside --surveyfunnel-lite-flex">
											<?php if ( 'draft' === $survey->post_status ) : ?>
												<div class="surveyfunnel-lite-badge surveyfunnel-lite-badge-unpublished"><?php echo esc_attr_e( 'Unpublished', 'surveyfunnel' ); ?></div>
											<?php else : ?>
												<div class="surveyfunnel-lite-badge surveyfunnel-lite-badge-published"><?php echo esc_attr_e( 'Published', 'surveyfunnel' ); ?></div>
											<?php endif; ?>
											<div class="--surveyfunnel-lite-flex surveyfunnel-lite-post-icons">
												<span  class="surveyfunnel-lite-tooltip">
													<a class="icon" href="<?php echo esc_url( $url_to_redirect . $survey->ID . '#/build' ); ?>">
														<img src="<?php echo esc_url( SURVEYFUNNEL_LITE_PLUGIN_URL . 'admin/admin-images/dashboard-images/build.png' ); ?>" alt="Build">
													</a>
													<span class="surveyfunnel-lite-tooltiptext"><?php esc_html_e( 'Build', 'surveyfunnel' ); ?></span>
												</span>
												<span  class="surveyfunnel-lite-tooltip">
													<a class="icon" href="<?php echo esc_url( $url_to_redirect . $survey->ID . '#/design' ); ?>">
														<img src="<?php echo esc_url( SURVEYFUNNEL_LITE_PLUGIN_URL . 'admin/admin-images/dashboard-images/Design.png' ); ?>" alt="Design">
													</a>
													<span class="surveyfunnel-lite-tooltiptext"><?php esc_html_e( 'Design', 'surveyfunnel' ); ?></span>
												</span>
												<span  class="surveyfunnel-lite-tooltip">
													<a class="icon" href="<?php echo esc_url( $url_to_redirect . $survey->ID . '#/configure' ); ?>">
														<img src="<?php echo esc_url( SURVEYFUNNEL_LITE_PLUGIN_URL . 'admin/admin-images/dashboard-images/Configure.png' ); ?>" alt="Configure">
													</a>
													<span class="surveyfunnel-lite-tooltiptext"><?php esc_html_e( 'Configure', 'surveyfunnel' ); ?></span>
												</span>
												<span  class="surveyfunnel-lite-tooltip">
													<a class="icon" href="<?php echo esc_url( $url_to_redirect . $survey->ID . '#/share' ); ?>">
														<img src="<?php echo esc_url( SURVEYFUNNEL_LITE_PLUGIN_URL . 'admin/admin-images/dashboard-images/Share.png' ); ?>" alt="Configure">
													</a>
													<span class="surveyfunnel-lite-tooltiptext"><?php esc_html_e( 'Deploy', 'surveyfunnel' ); ?></span>
												</span>
												<span  class="surveyfunnel-lite-tooltip">
													<a class="icon" href="<?php echo esc_url( $url_to_redirect . $survey->ID . '#/reports' ); ?>">
														<img src="<?php echo esc_url( SURVEYFUNNEL_LITE_PLUGIN_URL . 'admin/admin-images/dashboard-images/Reports.png' ); ?>" alt="Configure">
													</a>
													<span class="surveyfunnel-lite-tooltiptext"><?php esc_html_e( 'Reports', 'surveyfunnel' ); ?></span>
												</span>
												<span  class="surveyfunnel-lite-tooltip">
													<div class="icon deleteIcon" delete-id="<?php echo intval( $survey->ID ); ?>">
														<img src="<?php echo esc_url( SURVEYFUNNEL_LITE_PLUGIN_URL . 'admin/admin-images/dashboard-images/Delete.png' ); ?>" alt="Configure">
													</div>
													<span class="surveyfunnel-lite-tooltiptext"><?php esc_html_e( 'Delete', 'surveyfunnel' ); ?></span>
												</span>
											</div>
										</div>
									</div>
								</div> 
							</div>
							<div class="surveyfunnel-lite-title-box --surveyfunnel-lite-flex">
								<div class="surveyfunnel-lite-title"><?php echo esc_attr( $survey->post_title ); ?></div>
								<div class="surveyfunnel-lite-badge surveyfunnel-lite-badge-sm surveyfunnel-lite-badge-<?php echo esc_html( get_post_meta( $survey->ID, 'surveyfunnel-lite-type', true ) ); ?> surveyfunnel-lite-badge-survey-type">
									<small><?php echo esc_html( get_post_meta( $survey->ID, 'surveyfunnel-lite-type', true ) ); ?></small>
								</div>
							</div>
							<div class="surveyfunnel-lite-content-stats --surveyfunnel-lite-grid">
								<div class="surveyfunnel-lite-stat-box surveyfunnel-lite-views">
									<div class="surveyfunnel-lite-stat">
										<span><?php echo esc_attr( $data['views'] ); ?></span>
										<small><?php esc_html_e( 'Views', 'surveyfunnel' ); ?></small>
									</div>
								</div>
								<div class="surveyfunnel-lite-stat-box surveyfunnel-lite-contacts">
									<div class="surveyfunnel-lite-stat">
										<span><?php echo esc_attr( $data['contacts'] ); ?></span>
										<small><?php esc_html_e( 'Contacts', 'surveyfunnel' ); ?></small>
									</div>
								</div>
								<div class="surveyfunnel-lite-stat-box surveyfunnel-lite-completion-rate">
									<div class="surveyfunnel-lite-stat">
										<span><?php echo esc_attr( $data['completionRate'] . '%' ); ?></span>
										<small><?php esc_html_e( 'Compl. Rate', 'surveyfunnel' ); ?></small>
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