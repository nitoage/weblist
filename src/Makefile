project = invoiceWeb
port = 10001
work_dir = ~/invoice/

start:
	forever start ./bin/$(project) $(port)
stop:
	forever stop `forever list|grep $(project) | grep $(port) | awk '{ print $$3 }'`
restart:
	make stop
	make start
list:
	forever list|grep $(project) | grep $(port)
test:
	nodejs ./bin/$(project) $(port)
clean:
	find . -name "*~" | xargs rm
backup:
	tar cvfz $(work_dir)/backup/`date "+%Y%m%d_%H%M%S_"`$(project).tgz ../$(project)
