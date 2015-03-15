"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.addColumn('Administrator', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Administrator', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Article', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Article', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Artist', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Artist', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Category', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Category', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Content', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Content', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Exhibition', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Exhibition', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Feedback', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Feedback', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Object', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Object', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('QRCode', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('QRCode', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Room', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Room', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('User', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('User', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('ObjectContent', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('ObjectContent', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        });

        migration.addColumn('Match', 'createdAt', {
            type : DataTypes.DATE,
            allowNull : false
        });
        migration.addColumn('Match', 'updatedAt', {
            type : DataTypes.DATE,
            allowNull : false
        })



            .complete(done);
    },

    down: function(migration, DataTypes, done) {
        migration.removeColumn('Administrator', 'createdAt');
        migration.removeColumn('Administrator', 'updatedAt');

        migration.removeColumn('Article', 'createdAt');
        migration.removeColumn('Article', 'updatedAt');

        migration.removeColumn('Artist', 'createdAt');
        migration.removeColumn('Artist', 'updatedAt');

        migration.removeColumn('Category', 'createdAt');
        migration.removeColumn('Category', 'updatedAt');

        migration.removeColumn('Content', 'createdAt');
        migration.removeColumn('Content', 'updatedAt');

        migration.removeColumn('Exhibition', 'createdAt');
        migration.removeColumn('Exhibition', 'updatedAt');

        migration.removeColumn('Feedback', 'createdAt');
        migration.removeColumn('Feedback', 'updatedAt');

        migration.removeColumn('Object', 'createdAt');
        migration.removeColumn('Object', 'updatedAt');

        migration.removeColumn('QRCode', 'createdAt');
        migration.removeColumn('QRCode', 'updatedAt');

        migration.removeColumn('Room', 'createdAt');
        migration.removeColumn('Room', 'updatedAt');

        migration.removeColumn('User', 'createdAt');
        migration.removeColumn('User', 'updatedAt');

        migration.removeColumn('ObjectContent', 'createdAt');
        migration.removeColumn('ObjectContent', 'updatedAt');

        migration.removeColumn('Match', 'createdAt');
        migration.removeColumn('Match', 'updatedAt')


            .complete(done);
    }
};