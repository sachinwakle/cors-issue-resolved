package io.sawa.webapp.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
	http.csrf().disable().headers()
		.referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN).and()
		.frameOptions().deny().and().authorizeRequests().antMatchers("/api/**").authenticated().and()
		.httpBasic().and().formLogin().successHandler(loginSuccess()).failureHandler(loginFailure()).and()
		.logout().logoutSuccessHandler(logoutSuccess());
    }

    private io.sawa.webapp.config.ApiLogoutSuccessHandler logoutSuccess() {
	return new ApiLogoutSuccessHandler();
    }

    private ApiLoginSuccessHandler loginSuccess() {
	return new ApiLoginSuccessHandler();
    }

    private ApiLoginFailureHandler loginFailure() {
	return new ApiLoginFailureHandler();
    }

}
