import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Clipboard, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { formatModalTime } from 'shared-modules/libs/date';
import { Styling } from 'ui/theme/general';
import { width, height } from 'libs/dimensions';
import { leaveNavigationBreadcrumb } from 'libs/bugsnag';
import ModalView from 'ui/components/ModalView';
import { locale, timezone } from 'libs/device';
import DualFooterButtons from 'ui/components/DualFooterButtons';
import SingleFooterButton from 'ui/components/SingleFooterButton';
import { getCurrencySymbol } from 'shared-modules/libs/currency';

const contentWidth = width - width / 10;

const styles = StyleSheet.create({
    content: {
        width: contentWidth,
        alignItems: 'flex-start',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        backgroundColor: 'transparent',
        fontFamily: 'SourceSansPro-Regular',
        fontSize: Styling.fontSize6,
        paddingBottom: height / 100,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unitText: {
        backgroundColor: 'transparent',
        fontFamily: 'SourceSansPro-Regular',
        fontSize: Styling.fontSize4,
        marginTop: height / 100,
        paddingBottom: height / 100,
    },
    wrapper: {
        alignItems: 'center',
        marginBottom: height / 70,
        width: contentWidth,
    },
    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowInnerWrapper: {
        flex: 7,
    },
    rowText: {
        backgroundColor: 'transparent',
        fontFamily: 'SourceCodePro-Medium',
        fontSize: Styling.fontSize2,
        marginTop: 2,
        width: width / 1.4,
    },
    timestamp: {
        backgroundColor: 'transparent',
        fontFamily: 'SourceSansPro-Regular',
        fontSize: Styling.fontSize3,
    },
    label: {
        backgroundColor: 'transparent',
        fontFamily: 'SourceSansPro-Bold',
        fontSize: Styling.fontSize3,
        paddingTop: height / 50,
        paddingBottom: height / 300,
    },
    addressRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    addressRowTopWrapper: {
        flex: 4.7,
    },
    addressRowText: {
        backgroundColor: 'transparent',
        fontFamily: 'SourceCodePro-Medium',
        fontSize: Styling.fontSize1,
        textAlign: 'left',
        width: width / 1.4,
        height: height / 20,
    },
    rowContainer: {
        paddingVertical: height / 70,
    },
});

/** Purchase details modal */
export default class PurchaseDetailsModal extends PureComponent {
    static propTypes = {
        /** @ignore */
        authorize: PropTypes.func.isRequired,
        /** Container element press event callback function */
        hideModal: PropTypes.func.isRequired,
        /** @ignore */
        t: PropTypes.func.isRequired,
        /** @ignore */
        generateAlert: PropTypes.func.isRequired,
        /** Transaction value */
        value: PropTypes.number.isRequired,
        /** @ignore */
        fee: PropTypes.number.isRequired,
        /** Wallet address (where the funds were transferred to) */
        address: PropTypes.string.isRequired,
        /** @ignore */
        status: PropTypes.string.isRequired,
        /** @ignore */
        shouldDisplayAuthorizationOption: PropTypes.bool.isRequired,
        /** IOTA unit */
        unit: PropTypes.string.isRequired,
        /** Purchase time */
        time: PropTypes.string.isRequired,
        /** Transaction bundle hash */
        bundle: PropTypes.string,
        /** Transaction currency code */
        currencyCode: PropTypes.string.isRequired,
        /** Content styles */
        style: PropTypes.shape({
            backgroundColor: PropTypes.string.isRequired,
            defaultTextColor: PropTypes.shape({ color: PropTypes.string.isRequired }).isRequired,
            titleColor: PropTypes.string.isRequired,
            containerBackgroundColor: PropTypes.shape({ backgroundColor: PropTypes.string.isRequired }).isRequired,
            rowTextColor: PropTypes.shape({ color: PropTypes.string.isRequired }).isRequired,
            primaryColor: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentDidMount() {
        leaveNavigationBreadcrumb('HistoryModalContent');
    }

    /**
     * Generates alert when item is copied
     *
     * @method copy
     *
     * @param {string} item
     * @param {string} type
     */
    copy(item, type) {
        const { t } = this.props;

        const types = {
            bundle: [t('bundleHashCopied'), t('bundleHashCopiedExplanation')],
            address: [t('addressCopied'), t('addressCopiedExplanation')],
        };

        Clipboard.setString(item);

        if (types[type]) {
            this.props.generateAlert('success', ...types[type]);
        }
    }

    /**
     * Renders address row
     *
     * @method renderAddressRow
     *
     * @param {string} address
     *
     * @returns {object}
     */
    renderAddressRow(address) {
        const { style } = this.props;

        return (
            <View style={styles.addressRowContainer}>
                <TouchableOpacity onPress={() => this.copy(address, 'address')} style={styles.addressRowTopWrapper}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="middle"
                        style={[styles.addressRowText, style.defaultTextColor]}
                    >
                        {address}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Renders dual footer buttons
     *
     * @method renderDualFooterButtons
     *
     * @returns {object}
     */
    renderDualFooterButtons() {
        const { authorize, t, hideModal } = this.props;

        const props = {
            onLeftButtonPress: () => {
                hideModal();
            },
            onRightButtonPress: () => {
                authorize();
            },
            leftButtonText: t('global:close'),
            rightButtonText: t('moonpay:authorize'),
        };

        return <DualFooterButtons {...props} />;
    }

    render() {
        const {
            shouldDisplayAuthorizationOption,
            status,
            currencyCode,
            address,
            hideModal,
            bundle,
            fee,
            value,
            unit,
            time,
            t,
            style,
        } = this.props;

        return (
            <ModalView
                modalButtons={
                    shouldDisplayAuthorizationOption ? (
                        this.renderDualFooterButtons()
                    ) : (
                        <SingleFooterButton onButtonPress={hideModal} buttonText={t('close')} />
                    )
                }
                displayTopBar
            >
                <View style={styles.content}>
                    <View style={styles.wrapper}>
                        <View style={styles.header}>
                            <Text style={[styles.headerText, { color: style.titleColor }]}>
                                {t('moonpay:moonpayPurchase')}
                            </Text>
                            <View style={styles.valueContainer}>
                                <Text style={[styles.headerText, { color: style.titleColor }]}>{value}</Text>
                                <Text style={[styles.unitText, { color: style.titleColor }]}>{unit}</Text>
                            </View>
                        </View>
                        <Text style={[styles.timestamp, style.defaultTextColor]}>
                            {' '}
                            {formatModalTime(locale, timezone, time)}
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.label, style.defaultTextColor]}>{t('fingerprintSetup:status')}:</Text>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity style={styles.rowInnerWrapper}>
                                <Text
                                    style={[styles.rowText, style.defaultTextColor]}
                                    numberOfLines={2}
                                    ellipsizeMode="middle"
                                >
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {bundle && (
                        <View style={styles.rowContainer}>
                            <Text style={[styles.label, style.defaultTextColor]}>{t('bundleHash')}:</Text>
                            <View style={styles.rowWrapper}>
                                <TouchableOpacity
                                    onPress={() => this.copy(bundle, 'bundle')}
                                    style={styles.rowInnerWrapper}
                                >
                                    <Text
                                        style={[styles.rowText, style.defaultTextColor]}
                                        numberOfLines={2}
                                        ellipsizeMode="middle"
                                    >
                                        {bundle}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    <View style={styles.rowContainer}>
                        <Text style={[styles.label, style.defaultTextColor]}>{t('address')}:</Text>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity style={styles.rowInnerWrapper}>
                                <Text
                                    style={[styles.rowText, style.defaultTextColor]}
                                    numberOfLines={2}
                                    ellipsizeMode="middle"
                                >
                                    {address}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={[styles.label, style.defaultTextColor]}>{t('moonpay:moonpayFee')}:</Text>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => this.copy(bundle, 'bundle')}
                                style={styles.rowInnerWrapper}
                            >
                                <Text
                                    style={[styles.rowText, style.defaultTextColor]}
                                    numberOfLines={2}
                                    ellipsizeMode="middle"
                                >
                                    {getCurrencySymbol(currencyCode)}
                                    {fee}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ModalView>
        );
    }
}
