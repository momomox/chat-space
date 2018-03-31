module ApplicationHelper
	require 'sass'

 def scss_to_css(scss_text)
  engine = Sass::Engine.new(scss_text, :syntax => :scss)
  engine.render
 end
end
