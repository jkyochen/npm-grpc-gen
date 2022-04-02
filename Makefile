build:
	mkdir -p target
	./node_modules/.bin/grpc_tools_node_protoc \
	--plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
	--ts_proto_out=./target \
	--proto_path=./protos \
	--ts_proto_opt=outputServices=grpc-js \
	./protos/*.proto
