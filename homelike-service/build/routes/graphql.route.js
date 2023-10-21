"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const graphql_compose_1 = require("graphql-compose");
const express_1 = require("express");
const express_graphql_1 = require("express-graphql");
const apartment_model_1 = require("../models/apartment.model");
const router = (0, express_1.Router)();
const customizationOptions = {};
const ApartmentTC = (0, graphql_compose_mongoose_1.composeMongoose)(apartment_model_1.Apartment, customizationOptions);
graphql_compose_1.schemaComposer.Query.addFields({
    apartmentById: ApartmentTC.mongooseResolvers.findById(),
    apartmentByIds: ApartmentTC.mongooseResolvers.findByIds(),
    apartmentOne: ApartmentTC.mongooseResolvers.findOne(),
    apartmentMany: ApartmentTC.mongooseResolvers.findMany(),
    apartmentCount: ApartmentTC.mongooseResolvers.count(),
    apartmentPagination: ApartmentTC.mongooseResolvers.pagination(),
});
const graphqlSchema = graphql_compose_1.schemaComposer.buildSchema();
router.use((0, express_graphql_1.graphqlHTTP)({
    schema: graphqlSchema,
    graphiql: true
}));
exports.default = router;
//# sourceMappingURL=graphql.route.js.map